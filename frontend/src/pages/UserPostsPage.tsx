import { Link, useParams } from "react-router-dom";
import { IPost } from "../interfaces/IPosts";
import PostsList from "../components/PostsList";
import { useEffect, useState } from "react";

function UserPosts() {
  const { id } = useParams();
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(posts);
  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="">
      <h2 className="mt-24 text-3xl text-white font-semibold text-center">
        {`#${id}'s Posts`}
      </h2>
      {isLoading && <p className="text-red-500">Loading...</p>}
      {posts !== null && isLoading === false && (
        <PostsList posts={posts} isEditable={true} />
      )}
      {(posts?.length === 0 || posts === null) && (
        <div className="text-center text-white ">
          <p className="text-lg text-center pt-10 py-2 px-4">
            Posts of user #{id} not found.{" "}
          </p>
          <Link to="/" className="text-lg text-centerpx-4 underline">
            Back to main page
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserPosts;
