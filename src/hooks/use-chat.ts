import _ from 'lodash';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import { Chat, Message } from '#/types';
import { fitFetcher } from '#/utilities';
import { convertDtoToMessage } from '#/utilities/message';

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

export function useChatMessagesQuery(id: Chat['id']) {
  return useSWRInfinite(CHAT_MESSAGES_QUERY_KEY(id), async (url) => {
    const json = await fitFetcher<ChatMessagesResponse>(url);
    return {
      messages: json.pageResult.values.map((v) => convertDtoToMessage(v)),
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
