import { useCallback } from 'react';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';

import { Chat, Message } from '#/types';

interface ChatState {
  chats: Chat[];
}

interface ChatAction {
  addNewMessage: (id: number, message: Message) => void;
  addPrevMessages: (id: number, messages: Message[]) => void;
}

export const useChatStore = create<ChatState & ChatAction>()(
  immer((set) => ({
    chats: [],

    addNewMessage: (id, message) => {
      set((state) => {
        const chat = state.chats.find((c) => c.id === id);
        if (chat) {
          chat.messages.unshift(message);
        } else {
          state.chats.push({ id, messages: [message] });
        }
      });
    },

    addPrevMessages: (id, messages) => {
      set((state) => {
        const chat = state.chats.find((c) => c.id === id);
        if (chat) {
          chat.messages.push(...messages);
        } else {
          state.chats.push({ id, messages });
        }
      });
    },
  }))
);

export const useChat = (id: Chat['id']) => {
  const chat = useChatStore((state) => state.chats.find((c) => c.id === id));

  const { addNewMessage, addPrevMessages } = useChatStore(
    useShallow((state) => ({
      addNewMessage: state.addNewMessage,
      addPrevMessages: state.addPrevMessages,
    }))
  );

  const bindedAddNewMessage = useCallback(
    (message: Message) => addNewMessage(id, message),
    [addNewMessage, id]
  );

  const bindedAddPrevMessages = useCallback(
    (messages: Message[]) => addPrevMessages(id, messages),
    [addPrevMessages, id]
  );

  return {
    chat,
    addNewMessage: bindedAddNewMessage,
    addPrevMessages: bindedAddPrevMessages,
  };
};
