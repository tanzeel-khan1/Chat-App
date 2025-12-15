import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],

  setSelectedConversation: (conversation) =>
    set({
      selectedConversation: conversation,
      messages: [], // 🔥 conversation change par purane messages clear
    }),

  setMessages: (messages) =>
    set({
      messages: Array.isArray(messages) ? messages : [], // 🔒 safety
    }),
}));

export default useConversation;
