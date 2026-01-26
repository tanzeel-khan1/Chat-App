import { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../stateman/useConversation";
import sound from "../assets/noti.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const {
    selectedConversation,
    addMessage,
  } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // Get current user ID
      const userInfoString = localStorage.getItem("userInfo");
      const authUser = userInfoString ? JSON.parse(userInfoString) : null;
      const currentUserId = authUser?.user?.id || authUser?.user?._id || authUser?._id;

      if (!currentUserId || !selectedConversation?._id) return;

      // Convert IDs to strings for comparison
      const senderId = String(newMessage.sender?._id || newMessage.sender);
      const receiverId = String(newMessage.receiver?._id || newMessage.receiver);
      const selectedUserId = String(selectedConversation._id);
      const currentUserIdStr = String(currentUserId);

      // ✅ Check if message belongs to current conversation
      // Message should be: (from selected user to current user) OR (from current user to selected user)
      const isFromSelectedUser = senderId === selectedUserId && receiverId === currentUserIdStr;
      const isToSelectedUser = senderId === currentUserIdStr && receiverId === selectedUserId;

      if (!isFromSelectedUser && !isToSelectedUser) {
        return; // Message not for this conversation
      }

      new Audio(sound).play().catch(() => {});
      addMessage(newMessage); // ✅ append message
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, selectedConversation, addMessage]);
};

export default useGetSocketMessage;
