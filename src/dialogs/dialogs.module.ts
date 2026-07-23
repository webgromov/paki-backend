import { Module } from '@nestjs/common';
import { RealtimeModule } from '../realtime/realtime.module';
import { DialogsController } from './dialogs.controller';
import { DialogsService } from './dialogs.service';

@Module({
  imports: [RealtimeModule],
  controllers: [DialogsController],
  providers: [DialogsService],
  exports: [DialogsService],
})
export class DialogsModule {}
