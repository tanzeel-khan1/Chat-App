import React from "react";
import Messages from "./Messages";
import useGetMessages from "../../context/useGetMessages";
import Loading from "../../components/Loading ";

const Message = () => {
  const { messages, loading } = useGetMessages(); // lowercase

  console.log(messages);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => {
          return <Messages key={message._id} message={message} />;
        })
      )}

      <div style={{ minHeight: "calc(90vh - 10vh)" }}>
        {!loading && messages.length === 0 && (
          <div>
            <p className="text-center font-bold mt-[40%]"> hi</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
