import { IsIn } from 'class-validator';
import type { ChatDialogStatus } from '../../common/chat.types';

export class UpdateDialogStatusDto {
  @IsIn(['open', 'resolved'])
  status!: ChatDialogStatus;
}
