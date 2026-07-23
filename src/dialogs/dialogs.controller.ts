import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatDialog } from '../common/chat.types';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { DialogsService } from './dialogs.service';

@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @Post()
  create(@Body() dto: CreateDialogDto): Promise<ChatDialog> {
    return this.dialogsService.create(dto);
  }

  @Get()
  findAll(): Promise<ChatDialog[]> {
    return this.dialogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ChatDialog> {
    return this.dialogsService.findOne(id);
  }
}
