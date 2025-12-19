// import React, { useEffect, useRef } from "react";
// import Messages from "./Messages";
// import useGetMessages from "../../context/useGetMessages";
// import Loading from "../../components/Loading";
// import useGetSocketMessage from "../../context/useGetSocketMessage";

// // const Message = () => {
// //   const { messages, loading } = useGetMessages();
// //   useGetSocketMessage()
// //   const lastMessageRef = useRef(null);

// //   useEffect(() => {
// //     if (messages.length > 0) {
// //       lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
// //     }
// //   }, [messages]);

// //   if (loading) return <Loading />;

// //   return (
// //     <>
// //       {messages.length > 0 ? (
// //         messages.map((message, index) => (
// //           <div
// //             key={message._id}
// //             ref={index === messages.length - 1 ? lastMessageRef : null}
// //           >
// //             <Messages message={message} />
// //           </div>
// //         ))
// //       ) : (
// //         <div className="min-h-[80vh] flex items-center justify-center">
// //           <p className="font-bold">hi</p>
// //         </div>
// //       )}
// //     </>
// //   );
// // };
// const Message = () => {
//   const { messages, loading } = useGetMessages();
//   useGetSocketMessage(); // 🔥 now safe

//   const lastMessageRef = useRef(null);

//   useEffect(() => {
//     lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       {messages.length > 0 ? (
//         messages.map((message, index) => (
//           <div
//             key={message._id}
//             ref={index === messages.length - 1 ? lastMessageRef : null}
//           >
//             <Messages message={message} />
//           </div>
//         ))
//       ) : (
//         <div className="min-h-[80vh] flex items-center justify-center">
//           <p className="font-bold">hi</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default Message;
import React, { useEffect, useRef } from "react";
import Messages from "./Messages";
import useGetMessages from "../../context/useGetMessages";
import Loading from "../../components/Loading";
import useGetSocketMessage from "../../context/useGetSocketMessage";
import useConversation from "../../stateman/useConversation";

const Message = () => {
  const { messages = [] } = useConversation(); // ✅ yahan se messages
  const { loading } = useGetMessages();        // ✅ sirf loading
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
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="opacity-60">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {messages.map((message, index) => (
        <div
          key={message._id || index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
        >
          <Messages message={message} />
        </div>
      ))}
    </div>
  );
};

export default Message;
