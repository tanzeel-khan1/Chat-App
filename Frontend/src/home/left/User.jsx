import React from "react";
import Users from "../Users";
import GetAllUsers from "../../context/GetAllUsers";

const User = ({ setShowSidebar }) => {
  const [allUser, loading] = GetAllUsers();

  console.log(allUser);
  return (
    <div
      style={{ maxHeight: "calc(100vh - 200px)" }}
      className="flex-1 overflow-y-auto"
    >
      {allUser.map((user, index) => {
        return <Users key={index} user={user} setShowSidebar={setShowSidebar} />;
      })}
    </div>
  );
};

export default User;
