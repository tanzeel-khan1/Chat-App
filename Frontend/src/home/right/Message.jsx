import React, { useEffect, useRef } from "react";
import Messages from "./Messages";
import useGetMessages from "../../context/useGetMessages";
import Loading from "../../components/Loading";
import useGetSocketMessage from "../../context/useGetSocketMessage";
import useConversation from "../../stateman/useConversation";

const Message = () => {
  const { messages = [] } = useConversation(); 
  const { loading } = useGetMessages();        
  useGetSocketMessage();

  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) {
    return <Loading />;
  }

  if (!loading && messages.length === 0) {
    return (
      <div
        className="min-h-[80vh] flex items-center justify-center p-4 bg-transparent"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <p className="opacity-60 text-slate-400 text-sm md:text-base">No messages yet</p>
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-transparent min-h-[80vh] p-2 md:p-4"
      style={{ overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {messages.map((message, index) => (
        <div
          key={message._id || index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
        >
          <Messages message={message} />
        </div>
      ))}
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Message;
