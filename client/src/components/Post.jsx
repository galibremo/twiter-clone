import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import CommentSection from "./CommentSection";

export default function Post({
  post,
  onLike,
  setPosts,
  activePostId,
  onToggleComments,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const isLiked = post?.likes?.includes(currentUser._id);
  const isMyPost = currentUser._id === post?.user?._id;
  const showComments = activePostId === post._id;
  
  const handleDeletePost = () => {};
  return (
    <div className="p-4 border-b border-gray-700">
      <div className="flex justify-between gap-3">
        <div className="flex gap-3 w-full">
          <img
            className="h-9 w-9 rounded-full"
            src={post?.user?.profileImg || "avatar-placeholder.png"}
            alt="picture"
          />
          <div className="w-full">
            {post?.user?.fullName}
            <p>{post?.text}</p>
            {post?.img && (
              <img
                src={post?.img}
                className="h-96 w-full object-contain rounded-lg border border-gray-700"
                alt=""
              />
            )}
            <div className="flex justify-between items-center p-1 w-full">
              <div
                className="flex items-center gap-2 group"
                onClick={() => onLike(post?._id)}
              >
                <FaRegHeart
                  className={`w-4 h-4 cursor-pointer group-hover:text-pink-500 ${
                    isLiked ? "text-pink-500" : "text-slate-500"
                  }`}
                />
                <span
                  className={`text-sm group-hover:text-pink-500 cursor-pointer ${
                    isLiked ? "text-pink-500" : "text-slate-500"
                  }`}
                >
                  {post?.likes?.length}
                </span>
              </div>
              <div
                className="flex items-center gap-2 group"
                onClick={() => onToggleComments(post._id)}
              >
                <FaRegComment className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                <span className="text-sm cursor-pointer text-slate-500 group-hover:text-pink-500">
                  {post?.comments?.length}
                </span>
              </div>
              <div className="group">
                <BiRepost className="w-6 h-6 cursor-pointer text-slate-500 group-hover:text-pink-500" />
              </div>
              <div className="group">
                <FaRegBookmark className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
              </div>
            </div>
            {showComments && <CommentSection post={post} setPosts={setPosts} />}
          </div>
        </div>
        {isMyPost && (
          <span className="flex justify-end">
            <FaTrash
              className="cursor-pointer hover:text-red-500"
              onClick={handleDeletePost}
            />
          </span>
        )}
      </div>
    </div>
  );
}
