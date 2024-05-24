import { User } from '.';

export interface Message {
  id: number;
  userId: User['id'];
  messageType: 'TEXT' | 'IMAGE';
  createdAt: string;
  content?: string;
  imageUrl?: string;
}

export interface TextMessage extends Message {
  messageType: 'TEXT';
  content: string;
}

export interface ImageMessage extends Message {
  messageType: 'IMAGE';
  imageUrl: string;
}
