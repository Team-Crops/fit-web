import useSWR from 'swr';
import useSWRSubscription from 'swr/subscription';

import { Chat, Message } from '#/types';
import { fitFetcher } from '#/utilities';
import { fitSocket } from '#/utilities/socket';

const CHAT_MESSAGES_QUERY_KEY = (id: Chat['id'], lastMessageId?: number) =>
  `/v1/chat/room/${id}/message${lastMessageId ? `?lastMessageId=${lastMessageId}` : ''}`;
const CHAT_RECENT_MESSAGE_QUERY_KEY = (id: Chat['id']) => `/v1/chat/room/${id}/recent`;

export function useChatSubscription(id: Chat['id']) {
  return useSWRSubscription(id.toString(), (id, { next }) => {
    const socket = fitSocket({ roomId: id });
    socket.on('get_message', (message: Message) => next(null, message));
    return () => socket.disconnect();
  });
}

interface ChatMessagesResponse {
  pageResult: {
    values: {
      content?: string;
      imageUrl?: string;
      messageId: number;
      messageType: 'TEXT' | 'IMAGE';
      userId: number;
    }[];
    hasNext: boolean;
  };
}

export function useChatMessagesQuery(id?: Chat['id'] | null, lastMessageId?: number) {
  return useSWR(
    id ? CHAT_MESSAGES_QUERY_KEY(id, lastMessageId) : null,
    async (...args: Parameters<typeof fitFetcher>) => {
      const json: ChatMessagesResponse = await fitFetcher(...args);
      return json.pageResult.values.map(
        (v) =>
          ({
            id: v.messageId,
            content: v.content,
            imageUrl: v.imageUrl,
            userId: v.userId,
            messageType: v.messageType,
          }) as Message
      );
    }
  );
}

interface ChatRecentMessageResponse {
  messageId: Message['id'];
}

export function useChatRecentMessageQuery(id: Chat['id']) {
  return useSWR(
    CHAT_RECENT_MESSAGE_QUERY_KEY(id),
    async (...args: Parameters<typeof fitFetcher>) => {
      const json: ChatRecentMessageResponse = await fitFetcher(...args);
      return json.messageId;
    }
  );
}
