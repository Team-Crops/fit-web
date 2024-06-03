import _ from 'lodash';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import useSWRSubscription from 'swr/subscription';

import { Chat, Message } from '#/types';
import { fitFetcher } from '#/utilities';
import { fitSocket } from '#/utilities/socket';

const CHAT_MESSAGES_QUERY_KEY =
  (id: Chat['id']) => (index: number, previousPageData: ChatMessagesPage | null) => {
    if (previousPageData && !previousPageData.hasNext) {
      return null;
    }

    if (index === 0 || !previousPageData) {
      return `/v1/chat/room/${id}/message`;
    }

    return `/v1/chat/room/${id}/message?lastMessageId=${_.last(previousPageData.messages)!.id}`;
  };

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
      imagesUrl?: string;
      messageId: number;
      messageType: 'TEXT' | 'IMAGE';
      userId: number;
      createdAt: string;
    }[];
    hasNext: boolean;
  };
}

interface ChatMessagesPage {
  messages: Message[];
  hasNext: boolean;
}

export function useChatMessagesQuery(id: Chat['id']) {
  return useSWRInfinite(CHAT_MESSAGES_QUERY_KEY(id), async (url) => {
    const json = await fitFetcher<ChatMessagesResponse>(url);
    return {
      messages: json.pageResult.values.map((v) => ({
        id: v.messageId,
        content: v.content,
        imageUrl: v.imagesUrl,
        userId: v.userId,
        messageType: v.messageType,
        createdAt: v.createdAt,
      })),
      hasNext: json.pageResult.hasNext,
    } as { messages: Message[]; hasNext: boolean };
  });
}

interface ChatRecentMessageResponse {
  messageId: Message['id'];
}

export function useChatRecentMessageQuery(id: Chat['id']) {
  return useSWR(CHAT_RECENT_MESSAGE_QUERY_KEY(id), async (url) => {
    const json = await fitFetcher<ChatRecentMessageResponse>(url);
    return json.messageId;
  });
}
