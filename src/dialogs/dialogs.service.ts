import { Injectable, NotFoundException } from '@nestjs/common';
import { toChatDialog } from '../common/chat.mappers';
import { ChatDialog } from '../common/chat.types';
import { Dialog } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { CentrifugoService } from '../realtime/centrifugo.service';

const LAST_MESSAGE_INCLUDE = {
  messages: {
    orderBy: { createdAt: 'desc' as const },
    take: 1,
  },
};

@Injectable()
export class DialogsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly centrifugoService: CentrifugoService,
  ) {}

  async create(dto: CreateDialogDto): Promise<ChatDialog> {
    const dialog = await this.prisma.dialog.create({
      data: { clientName: dto.clientName },
    });
    const chatDialog = toChatDialog(dialog);

    await this.centrifugoService.publish('operator:dialogs', {
      type: 'dialog.created',
      payload: chatDialog,
    });

    return chatDialog;
  }

  async findAll(): Promise<ChatDialog[]> {
    const dialogs = await this.prisma.dialog.findMany({
      orderBy: { updatedAt: 'desc' },
      include: LAST_MESSAGE_INCLUDE,
    });

    return dialogs.map(toChatDialog);
  }

  async findOne(id: string): Promise<ChatDialog> {
    const dialog = await this.prisma.dialog.findUnique({
      where: { id },
      include: LAST_MESSAGE_INCLUDE,
    });

    if (!dialog) {
      throw new NotFoundException('Обращение не найдено.');
    }

    return toChatDialog(dialog);
  }

  /** Сырая модель без DTO-маппинга */
  async findRawByIdOrThrow(id: string): Promise<Dialog> {
    const dialog = await this.prisma.dialog.findUnique({ where: { id } });

    if (!dialog) {
      throw new NotFoundException('Обращение не найдено.');
    }

    return dialog;
  }
}
