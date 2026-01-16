import React, { useState } from "react";
import useDeleteMessage from "../../hooks/DeleteMsg";

const Messages = ({ message, onMessageDeleted }) => {
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

  const { deleteMessage, loading, error } = useDeleteMessage();
  const [isDeleted, setIsDeleted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = async () => {
    const result = await deleteMessage(message._id);
    if (result?.success) {
      setIsDeleted(true);
      if (onMessageDeleted) onMessageDeleted(message._id);
    }
    setMenuOpen(false);
  };

  if (isDeleted) return null;

  return (
    <div
      className={`flex ${alignmentClass} w-full px-2 md:px-4 py-1 md:py-2 relative`}
    >
      <div
        className={`${chatColor} px-4 py-3 ${roundedClass} max-w-[75%] md:max-w-sm break-words relative transition-transform duration-200 hover:scale-[1.02]`}
      >
        {/* Message text */}
        <p className="text-sm md:text-base leading-relaxed">
          {message.message}
        </p>

        {/* Time */}
        <span className="text-xs opacity-70 block text-right mt-2">
          {formattedTime}
        </span>

        {/* Three-dot menu */}
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer text-white text-lg p-1  rounded hover:text-black "
          >
            ⋮
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-10 overflow-hidden">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="w-full text-left px-3 py-2 cursor-pointer hover:bg-white text-red-600 transition"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>

        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default Messages;
