import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateDialogDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Length(2, 80)
  clientName!: string;
}
