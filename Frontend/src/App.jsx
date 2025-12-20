import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Logout from "./home/left1/Logout";
import Signup from "./components/Signup";
import Login from "./components/Login";

import { useAuth } from "./context/AuthProvider";
import useConversation from "./stateman/useConversation";

const App = () => {
  const { authUser } = useAuth();
  const { selectedConversation } = useConversation();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Routes>
        {/* HOME / CHAT */}
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen overflow-hidden bg-black">

                {/* ===== DESKTOP VIEW ===== */}
                <div className="hidden md:flex w-full h-full">
                  <Logout />
                  <Left setShowSidebar={setShowSidebar} />
                  <Right setShowSidebar={setShowSidebar} />
                </div>

                {/* ===== MOBILE VIEW ===== */}
                <div className="md:hidden relative w-full h-full">

                  {/* Logout Button (Mobile) */}
                  <div className="fixed top-4 right-4 z-50">
                    <Logout />
                  </div>

                  {/* Sidebar (Users List) */}
                  <div
                    className={`fixed inset-0 z-30 bg-black ${
                      selectedConversation && !showSidebar ? "hidden" : "block"
                    }`}
                  >
                    <Left setShowSidebar={setShowSidebar} />
                  </div>

                  {/* Overlay when sidebar open */}
                  {showSidebar && selectedConversation && (
                    <div
                      className="fixed inset-0 bg-black/50 z-20"
                      onClick={() => setShowSidebar(false)}
                    />
                  )}

                  {/* Chat Area */}
                  <div
                    className={`fixed inset-0 z-10 ${
                      selectedConversation ? "block" : "hidden"
                    }`}
                  >
                    <Right setShowSidebar={setShowSidebar} />
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
