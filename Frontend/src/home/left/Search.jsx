// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import GetAllUsers from "../../context/GetAllUsers";
// import useConversation from "../../stateman/useConversation";

// const SimpleSearch = () => {
//   const [search, setSearch] = useState("");
//   const [allusers] = GetAllUsers();
//   const { setSelectedConversation } = useConversation();
//   return (
//     <div>
//       <div className="px-6 py-4 flex justify-center">
//         <div className="w-full max-w-xl">
//           <form
//             onSubmit={
//               (handleSubmit = (e) => {
//                 e.preventDefault();
//                 if (!search) return;
//                 const conversation = allusers.find((user) => {
//                   return user.name.tolowerCase().includes(search.toLowerCase());
//                   if (conversation) {
//                     setSelectedConversation(conversation);
//                     setSearch("");
//                   } else {
//                     alert("user not found");
//                   }
//                 });
//               })
//             }
//           >
//             <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-transparent shadow-sm hover:shadow-md transition-shadow">
//               <input
//                 type="search"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none"
//               />
//               <button className="bg-blue-500 cursor-pointer rounded-full text-white px-6 py-3 hover:bg-blue-600 transition-colors flex items-center justify-center">
//                 <Search className="w-5 h-5" />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimpleSearch;
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
    if (!search) return;

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
    <div className="px-6 py-4 flex justify-center">
      <div className="w-full max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-transparent shadow-sm hover:shadow-md transition-shadow">
            <input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 cursor-pointer rounded-full text-white px-6 py-3 hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleSearch;
