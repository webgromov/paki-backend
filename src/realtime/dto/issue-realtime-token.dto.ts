import { IsIn, IsString, Length } from 'class-validator';
import type { RealtimeRole } from '../../common/realtime.types';

export class IssueRealtimeTokenDto {
  @IsIn(['client', 'operator'])
  role!: RealtimeRole;

  @IsString()
  @Length(1, 100)
  id!: string;
}
