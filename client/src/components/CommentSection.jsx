import React, { useState } from "react";
import axios from "axios";

export default function CommentSection({ post, setPosts }) {
  const [comments, setComments] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/post/comment/${post._id}`, {
        text: comments,
      });
      if (data.success === true) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id ? { ...post, comments: data.comments } : post
          )
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-3 max-h-60 overflow-auto">
      <form
        className="flex gap-2 items-center border-gray-600 pt-2"
        onSubmit={handleSubmit}
      >
        <textarea
          className="w-full p-1 rounded text-md resize-none border focus:outline-none border-gray-800 bg-transparent"
          placeholder="Add a comment..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <input
          type="submit"
          className="bg-primary rounded-full text-white px-4 py-2 cursor-pointer"
          value="Post"
        />
      </form>
      {post.comments.length === 0 && (
        <p className="text-sm text-slate-500">
          No comments yet 🤔 Be the first one 😉
        </p>
      )}
      {post.comments.map((comment) => (
        <div key={comment?._id} className="flex gap-2 items-start">
          <img
            className="w-8 h-8 rounded-full"
            src={comment?.user?.profileImg || "avatar-placeholder.png"}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-bold">{comment?.user?.fullName}</span>
              <span className="text-gray-700 text-sm">
                @{comment?.user?.username}
              </span>
            </div>
            <div className="text-sm">{comment?.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
