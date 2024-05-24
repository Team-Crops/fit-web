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
      imageUrl?: string;
      messageId: number;
      messageType: 'TEXT' | 'IMAGE';
      userId: number;
    }[];
    hasNext: boolean;
  };
}

interface ChatMessagesPage {
  messages: Message[];
  hasNext: boolean;
}

export function useChatMessagesQuery(id: Chat['id']) {
  return useSWRInfinite<ChatMessagesPage>(
    CHAT_MESSAGES_QUERY_KEY(id),
    async (...args: Parameters<typeof fitFetcher>) => {
      const json: ChatMessagesResponse = await fitFetcher(...args);
      return {
        messages: json.pageResult.values.map(
          (v) =>
            ({
              id: v.messageId,
              content: v.content,
              imageUrl: v.imageUrl,
              userId: v.userId,
              messageType: v.messageType,
            }) as Message
        ),
        hasNext: json.pageResult.hasNext,
      };
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
