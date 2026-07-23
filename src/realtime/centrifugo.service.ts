import { Injectable, Logger } from '@nestjs/common';
import { RealtimeEvent } from '../common/realtime.types';

@Injectable()
export class CentrifugoService {
  private readonly logger = new Logger(CentrifugoService.name);

  async publish(channel: string, event: RealtimeEvent): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.CENTRIFUGO_URL}/api/publish`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.CENTRIFUGO_API_KEY ?? '',
          },
          body: JSON.stringify({ channel, data: event }),
        },
      );

      if (!response.ok) {
        this.logger.error(
          `Centrifugo publish failed: ${response.status} ${await response.text()}`,
        );
      }
    } catch (error) {
      this.logger.error('Centrifugo publish error', error as Error);
    }
  }
}
