import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Message from "./Message";
import Type from "./Type";
import useConversation from "../../stateman/useConversation";
import { useAuth } from "../../context/AuthProvider";
import { Menu } from "lucide-react";

export default function Right({ setShowSidebar }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  return (
    <div className="w-full md:w-[70%] h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {!selectedConversation ? (
        <NoChat setShowSidebar={setShowSidebar} />
      ) : (
        <>
          <Chatuser setShowSidebar={setShowSidebar} />

          <div className="flex-1 overflow-y-auto">
            <Message />
          </div>

          <Type />
        </>
      )}
    </div>
  );
}

const NoChat = ({ setShowSidebar }) => {
  const { authUser } = useAuth();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      {/* Mobile Menu Button */}
      <div className="md:hidden w-full flex justify-start mb-4">
        <button
          onClick={() => setShowSidebar(true)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <h1 className="text-center text-slate-400 text-base md:text-lg px-4">
        Welcome <span className="text-blue-400 font-semibold">{authUser?.user?.name || "Guest"}</span>,
        <br />
        <span className="text-slate-500">select a chat to start messaging</span>
      </h1>
    </div>
  );
};
