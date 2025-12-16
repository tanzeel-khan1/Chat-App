import React from "react";

const Messages = ({ message }) => {
  // const authUser = localStorage.getItem("userInfo");
  // const itsme = message.senderId === authUser?.user?._id;
  const authUser = JSON.parse(localStorage.getItem("userInfo"));
const itsme = message.senderId === authUser?.user?._id;

  const chatName = itsme ? "chat-end" : "chat-start";
  const chatColor = itsme ? "bg-blue-00" : "";

  return (
    <>
      <div className="p-4">
        <div className= {`chat ${chatName}`}>
          <div className= {`text-white ${chatColor} `}>
            <div className="bg-blue-500 text-white px-4 py-2 rounded-xl rounded-br-none max-w-xs">
              {message.message}
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default Messages;

