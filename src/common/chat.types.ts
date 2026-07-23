export type ChatAuthorRole = 'client' | 'operator';

export type ChatMessage = {
  id: string;
  dialogId: string;
  authorRole: ChatAuthorRole;
  authorName: string;
  text: string;
  createdAt: string;
};

export type ChatDialog = {
  id: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: ChatMessage | null;
};
