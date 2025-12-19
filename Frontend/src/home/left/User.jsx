import React from "react";
import Users from "../Users";
import GetAllUsers from "../../context/GetAllUsers";

const User = () => {
  const [allUser, loading] = GetAllUsers();

  console.log(allUser);
  return (
    <div
      style={{ maxHeight: "calc(84vh - 10vh)" }}
      className="flex-babar overflow-y-auto"
    >
      {allUser.map((user, index) => {
        return <Users key={index} user={user} />;
      })}
    </div>
  );
};

export default User;
