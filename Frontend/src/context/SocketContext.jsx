import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider.jsx";
import io from "socket.io-client";

export const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (!authUser) return;

    const rawId = authUser?.user?.id || authUser?.user?._id || authUser?._id;
    if (!rawId) {
      console.warn("No user _id found in authUser:", authUser);
      return;
    }

    const userId = typeof rawId === "string" ? rawId : String(rawId);

    const newSocket = io("http://localhost:5002", {
      query: { userId },
    });

    setSocket(newSocket);

    // ✅ listen for online users update
    newSocket.on("getOnlineUsers", (users) => {
      console.log("Online users received:", users);
      setOnlineUsers(users);
    });

    newSocket.on("connect", () => {
      console.log("Socket connected with ID:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      newSocket.off("getOnlineUsers");
      newSocket.disconnect();
      console.log("Socket disconnected");
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
