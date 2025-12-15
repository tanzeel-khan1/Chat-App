import React from "react";
import useConversation from "../stateman/useConversation.js";

const Users = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  return (
    <div
      className={`hover:bg-stone-500 duration-300 ${
        isSelected ? "bg-slate-900" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center space-x-4 px-6 py-4 hover:bg-slate-600 duration-300 cursor-pointer">
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src="./avaty-men.png"
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover"
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
