import { useState } from "react";
import useConversation from "../stateman/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, addMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!message || !selectedConversation?._id) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        { message }
      );

      // ✅ Add new message to existing messages
      if (response.data?.data) {
        addMessage(response.data.data);
      } else if (response.data) {
        addMessage(response.data);
      }

    } catch (error) {
      console.log("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
