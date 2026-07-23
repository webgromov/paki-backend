import { Module } from '@nestjs/common';
import { CentrifugoService } from './centrifugo.service';
import { RealtimeController } from './realtime.controller';
import { RealtimeService } from './realtime.service';

@Module({
  controllers: [RealtimeController],
  providers: [CentrifugoService, RealtimeService],
  exports: [CentrifugoService],
})
export class RealtimeModule {}
