import _ from 'lodash';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Chat, Message } from '#/types';
import { fitSocket } from '#/utilities/socket';

interface ChatState {
  chats: Record<Chat['id'], Chat>;
}

interface ChatAction {
  createChat: (chat: Pick<Chat, 'id' | 'matchingId' | 'projectId' | 'users'>) => void;
  setParticipants: (id: Chat['id'], participants: Chat['users']) => void;
  setMessages: (id: Chat['id'], messages: Message[]) => void;
  unshiftMessage: (id: Chat['id'], message: Message) => void;
  appendMessages: (id: Chat['id'], messages: Message[]) => void;
}

export const useChatStore = create<ChatState & ChatAction>()(
  immer((set) => ({
    chats: {},

    createChat: (chat) => {
      set((state) => {
        if (state.chats[chat.id]) {
          return;
        }
        state.chats[chat.id] = {
          ...chat,
          messages: [],
          socket: fitSocket({ roomId: chat.id }),
        } as Chat;
      });
    },
    setParticipants: (id, participants) => {
      set((state) => {
        const chat = state.chats[id];
        if (!chat) {
          return;
        }
        chat.users = participants;
      });
    },
    setMessages: (id, messages) => {
      set((state) => {
        const chat = state.chats[id];
        if (!chat) {
          return;
        }
        chat.messages = messages;
      });
    },
    unshiftMessage: (id, message) => {
      set((state) => {
        const chat = state.chats[id];
        if (!chat) {
          return;
        }
        chat.messages.unshift(message);
      });
    },
    appendMessages: (id, messages) => {
      set((state) => {
        const chat = state.chats[id];
        if (!chat) {
          return;
        }
        chat.messages = [...chat.messages, ...messages];
      });
    },
  }))
);
