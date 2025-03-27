import { useState, useEffect } from "react";
import NavBar from "../../../shared/components/NavBar";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data)) 
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
  };
  const handlePostDeleted = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div>
      <NavBar />
      <div className="p-6 space-y-10 bg-gray-100 min-h-screen">
        <PostForm onPostAdded={(newPost) => setPosts([newPost, ...posts])} />
        <PostList 
          posts={posts} 
          onPostUpdated={handlePostUpdated}
          onPostDeleted={handlePostDeleted}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
