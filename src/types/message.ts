import { User } from '.';

export interface Message {
  id: number;
  type: 'TEXT' | 'IMAGE' | 'NOTICE' | 'JOIN' | 'EXIT' | 'READY' | 'CANCEL_READY' | 'COMPLETE';
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
  type: 'NOTICE' | 'JOIN' | 'EXIT' | 'READY' | 'CANCEL_READY';
  content: undefined;
  imageUrl: undefined;
  notice: string;
}

export interface ControlMessage extends Message {
  type: 'COMPLETE';
  content: undefined;
  imageUrl: undefined;
  notice: string;
}
