import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatMessage } from '../common/chat.types';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@ApiTags('messages')
@Controller('dialogs/:dialogId/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(
    @Param('dialogId') dialogId: string,
    @Body() dto: CreateMessageDto,
  ): Promise<ChatMessage> {
    return this.messagesService.create(dialogId, dto);
  }

  @Get()
  findAll(@Param('dialogId') dialogId: string): Promise<ChatMessage[]> {
    return this.messagesService.findAllByDialog(dialogId);
  }
}
