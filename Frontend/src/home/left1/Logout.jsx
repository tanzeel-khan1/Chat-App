import React, { useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "/api/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("userInfo");
      Cookies.remove("jwt");

      alert("Logout successful");

    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end">
      <div className="p-2 align-bottom">
        <button onClick={handleLogout} disabled={loading}>
          <RiLogoutBoxLine className="text-5xl p-3 cursor-pointer hover:bg-gray-600 rounded-full duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Logout;
