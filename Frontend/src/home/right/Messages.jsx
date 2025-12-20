import React from "react";

const Messages = ({ message }) => {
  const userInfoString = localStorage.getItem("userInfo");
  const authUser = userInfoString ? JSON.parse(userInfoString) : null;

  const senderId = message.sender?._id || message.sender;
  const currentUserId =
    authUser?.user?.id || authUser?.user?._id || authUser?._id;

  const itsme = String(senderId) === String(currentUserId);

  const chatColor = itsme
    ? "bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg"
    : "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30";

  const roundedClass = itsme
    ? "rounded-xl rounded-br-none"
    : "rounded-xl rounded-bl-none";

  const alignmentClass = itsme ? "justify-end" : "justify-start";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className={`flex ${alignmentClass} w-full px-2 md:px-4 py-1 md:py-2`}>
      <div
        className={`${chatColor} px-3 md:px-4 py-2 ${roundedClass} max-w-[75%] md:max-w-xs break-words`}
      >
        <p className="text-sm md:text-base">{message.message}</p>
        <span className="text-xs opacity-70 block text-right mt-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default Messages;
