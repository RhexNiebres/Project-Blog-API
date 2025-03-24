import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../services/AuthService";

const LandingPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const token = isAuthenticated();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>


      {/* Page Content */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Welcome to Our Platform</h1>
        <p>Sign up or log in to continue.</p>
      </div>

      {/* Posts Section */}
      <div style={{ padding: "20px" }}>
        <h2>Recent Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>By {post.author?.username || "Admin"}</small>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
