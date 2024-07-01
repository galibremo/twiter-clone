import axios from "axios";
import React, { useState, useEffect } from "react";
import Post from "./Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [activePostId, setActivePostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("/api/post/getposts");
        if (data.success === true) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, []);

  const handleLikeUnlike = async (postId) => {
    try {
      const { data } = await axios.post(`/api/post/like/${postId}`);
      if (data.success === true) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, likes: data.likes } : post
          )
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleToggleComments = (postId) => {
    setActivePostId((prevPostId) => (prevPostId === postId ? null : postId));
  };

  return (
    <div>
      {posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {posts && (
        <div>
          {posts.map((post, index) => (
            <Post
              key={index}
              post={post}
              onLike={handleLikeUnlike}
              setPosts={setPosts}
              activePostId={activePostId}
              onToggleComments={handleToggleComments}
            />
          ))}
        </div>
      )}
    </div>
  );
}
