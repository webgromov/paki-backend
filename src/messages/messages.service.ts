import { Injectable } from '@nestjs/common';
import { toChatMessage } from '../common/chat.mappers';
import { ChatMessage } from '../common/chat.types';
import { AuthorRole } from '../generated/prisma/client';
import { DialogsService } from '../dialogs/dialogs.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dialogsService: DialogsService,
  ) {}

  async create(dialogId: string, dto: CreateMessageDto): Promise<ChatMessage> {
    await this.dialogsService.findRawByIdOrThrow(dialogId);

    const [message] = await this.prisma.$transaction([
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

    return toChatMessage(message);
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
