import {useState} from "react";

const PostItem = ({post, onPostUpdated, onPostDeleted}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle]=useState(post.title);
    const [updatedContent, setUpdatedContent]= useState(post.content);

    const handleUpdate = async()=>{
    try{
        const response = await fetch(`http://localhost:8080/posts/${post.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({title:updatedTitle, content:updatedContent}),
        });
        if(response.ok){
            const updatedPost = await response.json();
            onPostUpdated(updatedPost);//update
            setIsEditing(false);//exit
        }else{
            alert("Error updating post.");
        }
    }catch(error){
        console.error("Error Updating post", error);
    }
    };

    const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:8080/posts/${post.id}`, {
            method: "DELETE", 
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
            },
          });
    
          if (response.ok) {
            onPostDeleted(post.id); 
          } else {
            alert("Error deleting post.");
          }
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      };
      return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {isEditing ? (
            <>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md h-28"
              />

              <button onClick={handleUpdate} className="w-full py-3 mt-4 bg-green-500 text-white rounded-md">
                Update Post
              </button>
            </>
          ) : (
            <>

              <h3 className="text-2xl font-semibold text-blue-800">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
              <button onClick={() => setIsEditing(true)} className="py-2 px-4 bg-green-500 text-white rounded-md">
                Edit
              </button>
              <button onClick={handleDelete} className="py-2 px-4 bg-red-500 text-white rounded-md ml-3">
                Delete
              </button>
            </>
          )}
        </div>
      );
};

export default PostItem;