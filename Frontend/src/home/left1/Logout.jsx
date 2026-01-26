import React, { useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });

      localStorage.removeItem("userInfo");
      Cookies.remove("jwt");

      setAuthUser(null); // ⭐ IMPORTANT
      toast.success("Logout successful");

      navigate("/login"); // optional but recommended

    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[4%] min-w-[60px] bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col justify-end border-r border-slate-700">
      <div className="p-2">
        <button 
          onClick={handleLogout} 
          disabled={loading}
          className="w-full flex items-center justify-center group"
          title="Logout"
        >
          <RiLogoutBoxLine className="text-3xl md:text-5xl p-2 md:p-3 cursor-pointer text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-full duration-300 transition-all group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};

export default Logout;
