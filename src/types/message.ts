import { User } from '.';

export interface Message {
  id: number;
  messageType:
    | 'TEXT'
    | 'IMAGE'
    | 'NOTICE'
    | 'JOIN'
    | 'EXIT'
    | 'COMPLETE'
    | 'READY'
    | 'CANCEL_READY';
  createdAt: string;
  userId?: User['id'];
  content?: string;
  imageUrl?: string;
  notice?: string;
}

export interface TextMessage extends Message {
  type: 'TEXT';
  content: string;
  imageUrl: undefined;
  notice: undefined;
}

export interface ImageMessage extends Message {
  type: 'IMAGE';
  content: undefined;
  imageUrl: string;
  notice: undefined;
}

export interface NoticeMessage extends Message {
  type: 'NOTICE' | 'JOIN' | 'EXIT' | 'COMPLETE' | 'READY';
  content: undefined;
  imageUrl: undefined;
  notice: string;
}
