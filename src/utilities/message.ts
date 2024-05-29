import { ImageMessage, Message, NoticeMessage, TextMessage } from '#/types';

export function isTextMessage(message: Message): message is TextMessage {
  return message.messageType === 'TEXT';
}

export function isImageMessage(message: Message): message is ImageMessage {
  return message.messageType === 'IMAGE';
}

export function isNoticeMessage(message: Message): message is NoticeMessage {
  return message.messageType === 'NOTICE';
}
