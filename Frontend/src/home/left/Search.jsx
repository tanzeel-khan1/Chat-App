import React, { useState } from "react";
import { Search } from "lucide-react";
import GetAllUsers from "../../context/GetAllUsers";
import useConversation from "../../stateman/useConversation";
import toast from "react-hot-toast";

const SimpleSearch = () => {
  const [search, setSearch] = useState("");
  const [allusers] = GetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const conversation = allusers?.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="px-2 md:px-4 py-3 md:py-4 flex justify-center">
      <div className="w-full max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center border border-slate-600 rounded-lg md:rounded-xl overflow-hidden bg-slate-700/30 backdrop-blur-sm shadow-sm hover:shadow-lg hover:border-slate-500 transition-all duration-300">
            {/* Input */}
            <input
              type="search"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-slate-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors duration-200"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 rounded-r-lg md:rounded-r-xl px-3 cursor-pointer md:px-4 py-2 md:py-3 flex items-center justify-center shadow-lg shadow-blue-500/20"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleSearch;
