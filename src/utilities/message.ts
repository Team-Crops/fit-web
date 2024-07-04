import { ImageMessage, Message, NoticeMessage, TextMessage, User } from '#/types';
import { ControlMessage } from '#/types/message';

export function isTextMessage(message: Message): message is TextMessage {
  return message.type === 'TEXT';
}

export function isImageMessage(message: Message): message is ImageMessage {
  return message.type === 'IMAGE';
}

export function isNoticeMessage(message: Message): message is NoticeMessage {
  const noticeMessageTypes = ['NOTICE', 'JOIN', 'EXIT', 'READY', 'CANCEL_READY', 'FORCED_OUT'];
  return noticeMessageTypes.includes(message.type);
}

export function isControlMessage(message: Message): message is ControlMessage {
  const controlMessageTypes = ['COMPLETE'];
  return controlMessageTypes.includes(message.type);
}

interface MessageDto {
  messageId: number;
  messageType: Message['type'];
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
    type: messageType as Message['type'],
  };
}
