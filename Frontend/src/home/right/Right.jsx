import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Message from "./Message";
import Type from "./Type";
import useConversation from "../../stateman/useConversation";
import { useAuth } from "../../context/AuthProvider";

export default function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  return (
    <div className="w-[70%] bg-slate-950 text-white">
      {!selectedConversation ? (
        <NoChat />
      ) : (
        <>
          <Chatuser />

          <div
            className="flex-babar overflow-y-auto"
            style={{ maxHeight: "calc(88vh - 8vh)" }}
          >
            <Message />
          </div>

          <Type />
        </>
      )}
    </div>
  );
}

const NoChat = () => {
  const { authUser } = useAuth();

  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-center text-gray-400">
        Welcome {authUser?.user?.name || "Guest"}, 
        <br />
        select a chat to start messaging
      </h1>
    </div>
  );
};
