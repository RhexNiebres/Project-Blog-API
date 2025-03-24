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
    <div className="p-6 space-y-10 bg-gray-100 min-h-screen">
    <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-300">
      <h2 className="text-2xl font-semibold text-blue-700">Add New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
      />
      <textarea
        placeholder="Content"
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 h-28"
      ></textarea>
      <button
        onClick={handleAddPost}
        className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Post
      </button>
    </div>

    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-blue-700">Existing Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white border border-gray-200 p-6 rounded-lg shadow-md space-y-4"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                value={editingPostContent.content}
                onChange={(e) =>
                  setEditingPostContent({
                    ...editingPostContent,
                    content: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-28"
              ></textarea>
              <button
                onClick={() => handleEditPost(post.id)}
                className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Update Post
              </button>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold text-blue-800">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => {
                    setEditingPostId(post.id);
                    setEditingPostContent({
                      title: post.title,
                      content: post.content,
                    });
                  }}
                  className="py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
  
  );
  
};

export default AdminDashboard;
