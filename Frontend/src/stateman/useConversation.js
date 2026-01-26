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
      messages: Array.isArray(messages) 
        ? messages.filter((msg, index, self) => 
            // Remove duplicates based on _id
            index === self.findIndex((m) => m._id === msg._id)
          )
        : [], // 🔒 safety
    }),

  addMessage: (newMessage) =>
    set((state) => {
      // Check if message already exists to prevent duplicates
      const messageExists = state.messages.some(
        (msg) => msg._id === newMessage._id
      );
      
      if (messageExists) {
        return state; // Don't add duplicate
      }
      
      return {
        messages: [...state.messages, newMessage],
      };
    }),
}));

export default useConversation;
