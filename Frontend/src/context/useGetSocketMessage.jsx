
// import { useEffect } from "react";
// import { useSocketContext } from "./SocketContext.jsx";
// import useConversation from "../stateman/useConversation.js";
// import sound from "../assets/noti.mp3";

// const useGetSocketMessage = () => {
//   const { socket } = useSocketContext();
//   const { setMessage } = useConversation();

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (newMessage) => {
//       const notification = new Audio(sound);
//       notification.play();

//       setMessage((prevMessages) => [...prevMessages, newMessage]);
//     };

//     socket.on("newMessage", handleNewMessage);

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//     };
//   }, [socket, setMessage]);
// };

// export default useGetSocketMessage;
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
      // ❌ wrong chat? ignore
      if (
        newMessage.sender !== selectedConversation?._id &&
        newMessage.receiver !== selectedConversation?._id
      ) {
        return;
      }

      new Audio(sound).play().catch(() => {});
      addMessage(newMessage); // ✅ append only
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, selectedConversation, addMessage]);
};

export default useGetSocketMessage;
