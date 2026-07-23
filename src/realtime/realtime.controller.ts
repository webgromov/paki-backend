import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IssueRealtimeTokenDto } from './dto/issue-realtime-token.dto';
import { RealtimeService } from './realtime.service';

@ApiTags('realtime')
@Controller('realtime')
export class RealtimeController {
  constructor(private readonly realtimeService: RealtimeService) {}

  @Post('token')
  issueToken(@Body() dto: IssueRealtimeTokenDto): {
    token: string;
    url: string;
  } {
    return {
      token: this.realtimeService.issueToken(dto.role, dto.id),
      url: process.env.CENTRIFUGO_WS_URL ?? '',
    };
  }
}
