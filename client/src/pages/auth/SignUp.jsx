import React, { useState } from "react";
import XSvg from "../../../public/X";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/signup", formData);
      setLoading(false);
      if (data.success === true) {
        navigate("/");
      }
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div className="max-w-7xl mx-auto flex h-screen items-center justify-center gap-16">
      <div className="hidden lg:flex items-center justify-center">
        <XSvg className="w-full fill-white" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex lg:hidden items-center justify-center">
          <XSvg className="w-24 fill-white" />
        </div>
        <h1 className="text-3xl font-bold">join today.</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="relative flex items-center">
            <MdOutlineMail className="absolute left-1" />
            <input
              className="py-2 px-6 rounded bg-transparent w-[280px] border border-gray-400 border-opacity-20"
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="relative flex items-center">
            <FaUser className="absolute left-1" />
            <input
              className="py-2 px-6 rounded bg-transparent w-[280px] border border-gray-400 border-opacity-20"
              type="text"
              id="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="relative flex items-center">
            <MdDriveFileRenameOutline className="absolute left-1" />
            <input
              className="py-2 px-6 rounded bg-transparent w-[280px] border border-gray-400 border-opacity-20"
              type="text"
              id="fullname"
              placeholder="Fullname"
              onChange={handleChange}
            />
          </div>
          <div className="relative flex items-center">
            <MdPassword className="absolute left-1" />
            <input
              className="py-2 px-6 rounded bg-transparent w-[280px] border border-gray-400 border-opacity-20"
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <input
            className="py-2 rounded-full w-[280px] bg-blue-600 cursor-pointer"
            type="submit"
            value="Sign up"
          />
        </form>
        <p>Already have an account?</p>
        <Link to="/signin">
          <input
            className="w-full rounded-full py-2 text-blue-600 border border-blue-600 cursor-pointer"
            type="button"
            value="Sign in"
          />
        </Link>
      </div>
    </div>
  );
}
