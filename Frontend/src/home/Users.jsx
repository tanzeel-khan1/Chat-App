import React from "react";
import useConversation from "../stateman/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";

const Users = ({ user, setShowSidebar }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === user._id;

  // ✅ convert user._id to string to match backend
  const isOnline = onlineUsers?.includes(String(user._id));
  console.log("Checking online:", user._id, isOnline);

  const handleUserClick = () => {
    setSelectedConversation(user);
    // Close sidebar on mobile after selecting a user
    if (setShowSidebar && window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  return (
    <div
      onClick={handleUserClick}
      className={`cursor-pointer duration-300 transition-all ${
        isSelected 
          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-l-4 border-blue-500" 
          : "hover:bg-slate-700/50"
      }`}
    >
      <div className="flex items-center space-x-3 md:space-x-4 px-4 md:px-6 py-3 md:py-4">
        <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
          <img
            src="/avaty-men.png"
            className="w-full h-full rounded-full object-cover"
            alt="avatar"
          />
          <span
            className={`absolute bottom-0.5 right-0.5 md:bottom-1 md:right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-slate-800 ${
              isOnline ? "bg-green-400 shadow-lg shadow-green-400/50" : "bg-slate-500"
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-base md:text-lg font-semibold text-white truncate">{user.name}</h1>
          <span className="text-xs md:text-sm text-slate-400 truncate block">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Users;
