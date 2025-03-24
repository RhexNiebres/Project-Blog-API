import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [commentContent, setCommentContent] = useState(""); // Only track content of the current comment
  const [editingCommentId, setEditingCommentId] = useState(null); // Track the currently editing comment ID

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleCommentAction = async (postId, commentId = null) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("You must be logged in to comment.");
      return;
    }

    const content = commentContent;

    if (commentId) {
      // if editing a comment
      const response = await fetch(`http://localhost:8080/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: post.comments.map((comment) =>
                    comment.id === commentId ? { ...comment, content: updatedComment.content } : comment
                  ),
                }
              : post
          )
        );
        setEditingCommentId(null);
        setCommentContent("");
      }
    } else {
      // if adding  a new comment
      const response = await fetch(`http://localhost:8080/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          postId,
          authorId: userId,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, comments: [newComment, ...post.comments] }
              : post
          )
        );
        setCommentContent("");
      }
    }
  };

  const handleStartEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setCommentContent(content);
  };

  const handleDeleteComment = async (postId, commentId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to delete a comment.");
      return;
    }

    const response = await fetch(`http://localhost:8080/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
            : post
        )
      );
    } else {
      const errorData = await response.json();
      alert(`Failed to delete comment: ${errorData.error}`);
    }
  };

  return (
    <div className="p-6 space-y-10 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold text-blue-700">All Posts</h1>
  {posts.map((post) => (
    <div key={post.id} className="bg-white border border-gray-200 p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-blue-800">{post.title}</h2>
      <p className="text-gray-700">{post.content}</p>

      {/* Comments Section */}
      <h3 className="text-lg font-semibold text-gray-600">Comments:</h3>
      {post.comments.length > 0 ? (
        <ul className="space-y-4">
          {post.comments.map((comment) => (
            <li
              key={comment.id}
              className="border border-gray-200 p-4 rounded-md shadow-sm bg-gray-50 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <strong className="text-blue-600">{comment.author?.username || "Unknown"}</strong>
                <small className="text-gray-500">{new Date(comment.createdAt).toLocaleString()}</small>
              </div>
              <p className="text-gray-700 mt-2">{comment.content}</p>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => handleStartEditComment(comment.id, comment.content)}
                  className="py-1 px-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteComment(post.id, comment.id)}
                  className="py-1 px-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No comments yet.</p>
      )}

      {/* Add/Edit Comment Section */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-300">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentContent}
          onChange={handleCommentChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleCommentAction(post.id, editingCommentId)}
          className={`w-full py-2 mt-2 text-white font-semibold rounded-md ${
            editingCommentId
              ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
          } transition duration-200 focus:outline-none focus:ring-2`}
        >
          {editingCommentId ? "Update Comment" : "Add Comment"}
        </button>
      </div>
    </div>
  ))}
</div>

  );
};

export default Home;
