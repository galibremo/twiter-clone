import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

export default function NotificationPage() {
  const limit = 10;
  const [getNotifi, setGetNotifi] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const { data } = await axios.get(`/api/notifications?limit=${limit}`);
        if (data.success) {
          setGetNotifi(data.notifications);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNotification();
  }, [currentUser._id]);

  console.log(getNotifi);

  return (
    <div className="flex flex-col border-r border-gray-700 min-h-screen w-full lg:w-[750px]">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <p className="font-bold">Notifications</p>
        <div className="cursor-pointer">
          <IoSettingsOutline className="w-4 h-4" />
        </div>
      </div>
      {getNotifi?.length === 0 && (
        <div className="text-center p-4 font-bold">No notifications 🤔</div>
      )}
      {getNotifi?.map((notification) => (
        <div className="border-b border-gray-700" key={notification._id}>
          <div className="flex gap-2 p-4">
            {notification.type === "follow" && (
              <FaUser className="w-7 h-7 text-primary" />
            )}
            {notification.type === "like" && (
              <FaHeart className="w-7 h-7 text-red-500" />
            )}
            <Link to={`/profile/${notification.from.username}`}>
              <img
                className="w-8 h-8 rounded-full"
                src={notification.from.profileImg || "/avatar-placeholder.png"}
              />
              <div className="flex gap-1">
                <span className="font-bold">@{notification.from.username}</span>{" "}
                {notification.type === "follow"
                  ? "followed you"
                  : "liked your post"}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
