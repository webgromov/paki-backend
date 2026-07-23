import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatDialog } from '../common/chat.types';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { UpdateDialogStatusDto } from './dto/update-dialog-status.dto';
import { DialogsService } from './dialogs.service';

@ApiTags('dialogs')
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

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateDialogStatusDto,
  ): Promise<ChatDialog> {
    return this.dialogsService.updateStatus(id, dto.status);
  }
}
