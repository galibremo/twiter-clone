import React from "react";
import CreatePost from "../../components/CreatePost";
import Posts from "../../components/Posts";
import { useState } from "react";

export default function Home() {
  const [feedType, setFeedType] = useState("forYou");
  return (
    <>
      <div className="flex flex-col border-r border-gray-700 min-h-screen w-full lg:w-[750px]">
        {/* Header */}
        <div className="flex w-full border-b border-gray-700">
          <div
            className={
              "flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
            }
            onClick={() => setFeedType("forYou")}
          >
            For you
            {feedType === "forYou" && (
              <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
            )}
          </div>
          <div
            className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
            onClick={() => setFeedType("following")}
          >
            Following
            {feedType === "following" && (
              <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
            )}
          </div>
        </div>

        {/*  CREATE POST INPUT */}
        <CreatePost />

        {/* POSTS */}
        <Posts feedType={feedType} />
      </div>
    </>
  );
}
