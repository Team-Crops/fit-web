import { useEffect, useMemo, useState } from 'react';

import _ from 'lodash';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import useSWRSubscription, { SWRSubscriptionOptions } from 'swr/subscription';

import { Chat, Message } from '#/types';
import { fitFetcher, fitSocket } from '#/utilities';
import { convertDtoToMessage } from '#/utilities/message';

const CHAT_MESSAGES_QUERY_KEY =
  (id?: Chat['id']) => (index: number, previousPageData: ChatMessagesPage | null) => {
    if (id === undefined) {
      return null;
    }

    if (previousPageData && !previousPageData.hasNext) {
      return null;
    }

    if (index === 0 || !previousPageData) {
      return `/v1/chat/room/${id}/message`;
    }

    return `/v1/chat/room/${id}/message?lastMessageId=${_.last(previousPageData.messages)!.id}`;
  };

const CHAT_RECENT_MESSAGE_QUERY_KEY = (id: Chat['id']) => `/v1/chat/room/${id}/recent`;

export function useChatSubscription(id?: Chat['id']) {
  return useSWRSubscription(
    id !== undefined ? [id] : null,
    ([id], { next }: SWRSubscriptionOptions<Message, Error>) => {
      const socket = fitSocket({ roomId: id });
      socket.on('get_message', (message: string) =>
        next(null, convertDtoToMessage(JSON.parse(message)))
      );
      return () => socket.disconnect();
    }
  );
}

interface ChatMessagesResponse {
  pageResult: {
    values: {
      createdAt: string;
      messageType: 'TEXT' | 'IMAGE';
      messageId: number;
      userId: number;
      content?: string;
      imageUrl?: string;
      notice?: string;
    }[];
    hasNext: boolean;
  };
}

interface ChatMessagesPage {
  messages: Message[];
  hasNext: boolean;
}

export function useChatMessagesQuery(id?: Chat['id']) {
  const { mutate, ...props } = useSWRInfinite(CHAT_MESSAGES_QUERY_KEY(id), async (url) => {
    const json = await fitFetcher<ChatMessagesResponse>(url);
    return {
      messages: json.pageResult.values.map((v) => convertDtoToMessage(v)),
      hasNext: json.pageResult.hasNext,
    } as { messages: Message[]; hasNext: boolean };
  });
  const append = useMemo(
    () => (message: Message) =>
      mutate((prev) => [{ messages: [message], hasNext: true }, ...(prev ?? [])]),
    [mutate]
  );
  return { append, mutate, ...props };
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

export function useChatMessageEmitter(id?: Chat['id']) {
  const [socket, setSocket] = useState<ReturnType<typeof fitSocket>>();

  useEffect(() => {
    if (!socket) {
      setSocket(fitSocket({ roomId: id }));
    }
    return () => socket?.disconnect();
  }, [id, socket]);

  return {
    emitText: (content: string) => socket?.emit('/chat/text', { content }),
    emitImage: (content: string) => socket?.emit('/chat/image', { content }),
  };
}
