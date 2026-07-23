import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { RealtimeRole } from '../common/realtime.types';

@Injectable()
export class RealtimeService {
  issueToken(role: RealtimeRole, id: string): string {
    return jwt.sign(
      { sub: id, role },
      process.env.CENTRIFUGO_TOKEN_SECRET ?? '',
      {
        expiresIn: '24h',
      },
    );
  }
}
