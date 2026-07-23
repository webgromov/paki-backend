import { Dialog, Message } from '../generated/prisma/client';
import { ChatDialog, ChatMessage } from './chat.types';

export function toChatMessage(message: Message): ChatMessage {
  return {
    id: message.id,
    dialogId: message.dialogId,
    authorRole: message.authorRole.toLowerCase() as ChatMessage['authorRole'],
    authorName: message.authorName,
    text: message.text,
    createdAt: message.createdAt.toISOString(),
  };
}

export function toChatDialog(
  dialog: Dialog & { messages?: Message[] },
): ChatDialog {
  const lastMessage = dialog.messages?.[0]
    ? toChatMessage(dialog.messages[0])
    : null;

  return {
    id: dialog.id,
    clientName: dialog.clientName,
    createdAt: dialog.createdAt.toISOString(),
    updatedAt: dialog.updatedAt.toISOString(),
    lastMessage,
  };
}
