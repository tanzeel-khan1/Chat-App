// import React from "react";

// const Loading = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="flex flex-col items-center gap-4">
//         {/* Spinner */}
//         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

//         {/* Text */}
//         <p className="text-gray-600 text-sm">Loading, please wait...</p>
//       </div>
//     </div>
//   );
// };

// export default Loading;
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-300 text-sm animate-pulse">
          Loading messages...
        </p>
      </div>
    </div>
  );
};

export default Loading;
