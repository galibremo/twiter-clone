import React from "react";
import { Link } from "react-router-dom";
import XSvg from "../../public/X";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import { signout } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);

  const handleSignout = () => {
    dispatch(signout());
  };
  return (
    <div className="sticky top-0 left-0 border-r h-screen border-gray-700 w-20 max-w-52 lg:w-full flex flex-col justify-between">
      <div>
        <Link to="/" className="flex justify-center lg:justify-start">
          <XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center lg:justify-start">
            <Link
              to="/"
              className="flex items-center gap-3 px-2 py-3 hover:bg-stone-900 transition-all rounded-full max-w-fit duration-300 cursor-pointer"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="hidden text-lg lg:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center lg:justify-start">
            <Link
              to="/notification"
              className="flex items-center gap-3 px-2 py-3 hover:bg-stone-900 transition-all rounded-full max-w-fit duration-300 cursor-pointer"
            >
              <IoNotifications className="w-8 h-8" />
              <span className="hidden text-lg lg:block">Notification</span>
            </Link>
          </li>
          <li className="flex justify-center lg:justify-start">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-2 py-3 hover:bg-stone-900 transition-all rounded-full max-w-fit duration-300 cursor-pointer"
            >
              <FaUser className="w-8 h-8" />
              <span className="hidden text-lg lg:block">Profile</span>
            </Link>
          </li>
        </ul>
      </div>
      {isAuthenticated && (
        <div className="flex mb-5">
          <Link
            to={`/profile/${currentUser.username}`}
            className="flex gap-3 transition-all duration-300 hover:bg-[#181818] px-2 py-3 rounded-full max-w-fit"
          >
            <img
              className="w-8 h-8 rounded-full hidden lg:inline-flex"
              src={currentUser?.profileImg || "/avatar-placeholder.png"}
            />
            <div className="flex gap-3">
              <div className="hidden lg:block">
                <p className="text-white font-bold text-sm w-20 truncate">
                  {currentUser?.fullName}
                </p>
                <p className="text-slate-500 text-sm">
                  @{currentUser?.username}
                </p>
              </div>
            </div>
          </Link>
          <BiLogOut
            onClick={handleSignout}
            className="w-8 h-8 lg:w-5 lg:h-5 cursor-pointer relative top-4"
          />
        </div>
      )}
    </div>
  );
}
