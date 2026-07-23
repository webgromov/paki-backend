import { Injectable } from '@nestjs/common';
import { toChatDialog, toChatMessage } from '../common/chat.mappers';
import { ChatMessage } from '../common/chat.types';
import { AuthorRole } from '../generated/prisma/client';
import { DialogsService } from '../dialogs/dialogs.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CentrifugoService } from '../realtime/centrifugo.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dialogsService: DialogsService,
    private readonly centrifugoService: CentrifugoService,
  ) {}

  async create(dialogId: string, dto: CreateMessageDto): Promise<ChatMessage> {
    await this.dialogsService.findRawByIdOrThrow(dialogId);

    const [message, dialog] = await this.prisma.$transaction([
      this.prisma.message.create({
        data: {
          dialogId,
          text: dto.text,
          authorName: dto.authorName,
          authorRole: dto.authorRole.toUpperCase() as AuthorRole,
        },
      }),
      this.prisma.dialog.update({
        where: { id: dialogId },
        data: { updatedAt: new Date() },
      }),
    ]);

    const chatMessage = toChatMessage(message);
    const chatDialog = toChatDialog({ ...dialog, messages: [message] });

    await this.centrifugoService.publish(`dialog:${dialogId}`, {
      type: 'message.created',
      payload: chatMessage,
    });
    await this.centrifugoService.publish('operator:dialogs', {
      type: 'dialog.updated',
      payload: chatDialog,
    });

    return chatMessage;
  }

  async findAllByDialog(dialogId: string): Promise<ChatMessage[]> {
    await this.dialogsService.findRawByIdOrThrow(dialogId);

    const messages = await this.prisma.message.findMany({
      where: { dialogId },
      orderBy: { createdAt: 'asc' },
    });

    return messages.map(toChatMessage);
  }
}
