export type ChatAuthorRole = 'client' | 'operator';

export type ChatDialogStatus = 'open' | 'resolved';

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
  status: ChatDialogStatus;
  createdAt: string;
  updatedAt: string;
  lastMessage: ChatMessage | null;
};
