import React from "react";
import Chatuser from "./Chatuser";
import Message from "./Message";
import Type from "./Type";

const Right = () => {
  return (
    <div className=" w-[70%] bg-slate-950 text-white">
      <Chatuser />
      <div
        className="flex-babar overflow-y-auto"
        style={{ maxHeight: "calc(88vh - 8vh" }}
      >
        <Message />
      </div>
      <Type />
    </div>
  );
};

export default Right;
