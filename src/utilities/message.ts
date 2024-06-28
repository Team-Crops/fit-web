import { ControlMessage, ImageMessage, Message, NoticeMessage, TextMessage, User } from '#/types';

export function isTextMessage(message: Message): message is TextMessage {
  return message.messageType === 'TEXT';
}

export function isImageMessage(message: Message): message is ImageMessage {
  return message.messageType === 'IMAGE';
}

export function isNoticeMessage(message: Message): message is NoticeMessage {
  return message.messageType === 'NOTICE';
}

export function isControlMessage(message: Message): message is ControlMessage {
  const controlMessageTypes = ['JOIN', 'EXIT', 'COMPLETE', 'READY'];
  return controlMessageTypes.includes(message.messageType);
}

interface MessageDto {
  messageId: number;
  messageType: 'TEXT' | 'IMAGE' | 'NOTICE' | 'JOIN' | 'EXIT' | 'COMPLETE' | 'READY';
  createdAt: string;
  userId?: User['id'];
  content?: string;
  imageUrl?: string;
  notice?: string;
}

export function convertDtoToMessage(messageDto: MessageDto): Message {
  const { messageId, messageType, ...message } = messageDto;
  return {
    ...message,
    id: messageId,
    messageType: messageType as Message['messageType'],
  };
}
