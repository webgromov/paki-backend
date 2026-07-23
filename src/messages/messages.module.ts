import { Module } from '@nestjs/common';
import { DialogsModule } from '../dialogs/dialogs.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { RealtimeModule } from '../realtime/realtime.module';

@Module({
  imports: [DialogsModule, RealtimeModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
