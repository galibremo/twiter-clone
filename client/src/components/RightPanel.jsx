import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RightPanelSkeletons from "./skeletons/RightPanelSkeletons";

export default function RightPanel() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/user/suggested");
        if (data.success === true) {
          setSuggestedUsers(data.suggestedUsers);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchUser();
  }, [currentUser._id]);

  if (suggestedUsers?.length === 0) return <div className="lg:w-64 w-0"></div>;

  return (
    <div className="hidden lg:block my-4 mx-2">
      <div className="bg-[#16181C] p-4 rounded-md sticky top-2">
        <p className="font-bold mb-4">Who to follow</p>
        <div className="flex flex-col gap-4">
          {loading && (
            <>
              <RightPanelSkeletons />
              <RightPanelSkeletons />
              <RightPanelSkeletons />
            </>
          )}
          {!loading &&
            suggestedUsers?.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className="flex items-center justify-between gap-5"
                key={user._id}
              >
                <div className="flex gap-2 items-center">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.profileImg || "/avatar-placeholder.png"}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28">
                      {user.fullname}
                    </span>
                    <span className="text-sm text-slate-500">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <button className="bg-white text-black hover:bg-white hover:opacity-90 rounded-full px-2 py-1">
                  Follow
                </button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
