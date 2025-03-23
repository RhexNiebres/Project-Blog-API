import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingPostContent, setEditingPostContent] = useState({
    title: "",
    content: "",
  });
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);
  
  const handleAddPost = async () => {
    try {
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,  // Assuming JWT token
        },
        body: JSON.stringify({
          title: newPostTitle,
          content: newPostContent,
        }),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error("Error response:", responseData);
        alert("Error adding post: " + (responseData.error || "Unknown error"));
      } else {
        setPosts((prevPosts) => [responseData, ...prevPosts]);
        setNewPostTitle("");
        setNewPostContent("");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Something went wrong while adding the post.");
    }
  };
  
  
  

  const handleEditPost = async (postId) => {
    const token = localStorage.getItem("token");
    const authorId = localStorage.getItem("userId");

    if (!token) {
      alert("You must be logged in to edit a post.");
      return;
    }

    const updatedPostContent = {
      ...editingPostContent,
      authorId: authorId,
    };

    const response = await fetch(`http://localhost:8080/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPostContent),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                title: updatedPost.title,
                content: updatedPost.content,
              }
            : post
        )
      );
      setEditingPostId(null);
      setEditingPostContent({ title: "", content: "" });
    } else {
      alert("Failed to update post.");
    }
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to delete a post.");
      return;
    }

    const response = await fetch(`http://localhost:8080/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } else {
      alert("Failed to delete post.");
    }
  };

  return (
    <div>
<div>
  <h2>Add New Post</h2>
  <input
    type="text"
    placeholder="Title"
    value={newPostTitle}
    onChange={(e) => setNewPostTitle(e.target.value)}
  />
  <textarea
    placeholder="Content"
    value={newPostContent}
    onChange={(e) => setNewPostContent(e.target.value)}
  ></textarea>
  <button onClick={handleAddPost}>Add Post</button>
</div>

      <div>
        <h2>Existing Posts</h2>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            {editingPostId === post.id ? (
              <>
                <input
                  type="text"
                  value={editingPostContent.title}
                  onChange={(e) =>
                    setEditingPostContent({
                      ...editingPostContent,
                      title: e.target.value,
                    })
                  }
                />
                <textarea
                  value={editingPostContent.content}
                  onChange={(e) =>
                    setEditingPostContent({
                      ...editingPostContent,
                      content: e.target.value,
                    })
                  }
                ></textarea>
                <button onClick={() => handleEditPost(post.id)}>
                  Update Post
                </button>
              </>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p><strong>Posted by: </strong>{post.author.username}</p> {/* Display username here */}
                <button
                  onClick={() => {
                    setEditingPostId(post.id);
                    setEditingPostContent({
                      title: post.title,
                      content: post.content,
                    });
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
