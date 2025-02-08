import { useEffect, useState } from "react";
import PostsList from "../components/PostsList";
import { IPost } from "../interfaces/IPosts";
import { Link } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      <h2 className="mt-24 text-3xl text-white font-semibold text-center">
        <p>All Posts</p>
        {posts?.length === 0 && (
          <Link
            to="/create"
            className="text-lg text-center pt-10 py-2 px-4 rounded underline"
          >
            No posts available, maybe create one?
          </Link>
        )}
      </h2>
      {posts !== null && <PostsList posts={posts} isEditable={false} />}
    </div>
  );
}

export default HomePage;
