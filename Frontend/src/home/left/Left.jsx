import React from "react";
import Search from "./Search";
import User from "./User";
import { X } from "lucide-react";

const Left = ({ setShowSidebar }) => {
  return (
    <div className="w-full md:w-[30%] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white h-screen flex flex-col overflow-hidden border-r border-slate-700">
      {/* Mobile Header with Menu Toggle */}
      <div className="flex items-center justify-between p-4 md:hidden border-b border-slate-700 bg-slate-800/50">
        <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Chat's</h1>
      
      </div>
      
      {/* Desktop Title */}
      <h1 className="hidden md:block font-bold text-2xl md:text-3xl p-2 px-4 md:px-11 mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Chat's</h1>
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <Search />
        <hr className="border-slate-700" />
        <User setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
};

export default Left;
