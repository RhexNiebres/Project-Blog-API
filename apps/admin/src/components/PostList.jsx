import PostItem from "./PostItem";

const PostList = ({ posts, onPostUpdated, onPostDeleted }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-blue-700">Existing Posts</h2>
      {posts.map((post) => (
        <PostItem
          key={post.id} 
          post={post} 
          onPostUpdated={onPostUpdated} 
          onPostDeleted={onPostDeleted}
        />
      ))}
    </div>
  );
};

export default PostList;
