import { ChatDialog, ChatMessage } from '../common/chat.types';

export type RealtimeEvent =
  | { type: 'message.created'; payload: ChatMessage }
  | { type: 'dialog.created'; payload: ChatDialog }
  | { type: 'dialog.updated'; payload: ChatDialog };

export type RealtimeRole = 'client' | 'operator';
