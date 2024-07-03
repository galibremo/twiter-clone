import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import RightPanel from "./components/RightPanel";
import Profile from "./pages/profile/Profile";
import NotificationPage from "./pages/notifications/NotificationPage";

export default function App() {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <div className="flex max-w-7xl mx-auto">
        {isAuthenticated && <Sidebar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path={`/profile/${currentUser.username}`}
            element={<Profile />}
          />
          <Route path="/notification" element={<NotificationPage />} />
        </Routes>
        {isAuthenticated && <RightPanel />}
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  );
}
