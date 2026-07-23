import { Transform } from 'class-transformer';
import { IsIn, IsString, Length } from 'class-validator';
import type { ChatAuthorRole } from '../../common/chat.types';

export class CreateMessageDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Length(1, 2000)
  text!: string;

  @IsIn(['client', 'operator'])
  authorRole!: ChatAuthorRole;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Length(2, 80)
  authorName!: string;
}
