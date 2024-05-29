import { User } from '.';

export interface Message {
  id: number;
  messageType: 'TEXT' | 'IMAGE' | 'NOTICE';
  createdAt: string;
  userId?: User['id'];
  content?: string;
  imageUrl?: string;
  notice?: string;
}

export interface TextMessage extends Message {
  messageType: 'TEXT';
  content: string;
  imageUrl: undefined;
  notice: undefined;
}

export interface ImageMessage extends Message {
  messageType: 'IMAGE';
  content: undefined;
  imageUrl: string;
  notice: undefined;
}

export interface NoticeMessage extends Message {
  messageType: 'NOTICE';
  content: undefined;
  imageUrl: undefined;
  notice: string;
}
