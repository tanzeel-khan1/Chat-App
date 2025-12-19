import React from "react";
import useConversation from "../stateman/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";

const Users = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === user._id;

  // ✅ convert user._id to string to match backend
  const isOnline = onlineUsers?.includes(String(user._id));
  console.log("Checking online:", user._id, isOnline);


  return (
    <div
      onClick={() => setSelectedConversation(user)}
      className={`cursor-pointer duration-300 ${
        isSelected ? "bg-slate-900" : "hover:bg-slate-600"
      }`}
    >
      <div className="flex items-center space-x-4 px-6 py-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <img
            src="/avaty-men.png"
            className="w-full h-full rounded-full object-cover"
            alt="avatar"
          />
          <span
            className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>

        <div>
          <h1 className="text-lg font-semibold text-white">{user.name}</h1>
          <span className="text-sm text-gray-300">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Users;
