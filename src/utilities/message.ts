import { ControlMessage, ImageMessage, Message, NoticeMessage, TextMessage } from '#/types';

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
