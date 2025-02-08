import { useContext } from "react";
import { IPost } from "../interfaces/IPosts";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface IPostCard {
  post: IPost;
  isEditable: boolean;
}
function PostCard({ post, isEditable }: IPostCard) {
  const { userSession } = useContext(AuthContext);

  async function deletePost(postId: string) {
    await fetch(`http://localhost:5000/api/posts/delete/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          return;
        } else {
          window.location.reload();
        }
      });
  }
  return (
    <li className="flex flex-row bg-slate-400 w-full lg:w-[50%] mt-10 rounded-xl p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="md:w-[20%] w-[30%] sm:w-32 h-44 xl:h-auto rounded-full xl:rounded-none xl:rounded-l-xl xl:items-start justify-center mt-1">
        <img
          src={post.userImg}
          className="rounded-full w-full h-fit shadow-xl"
        />
      </div>
      <div className="w-[70%] md:w-[80%] px-4">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div>
            <p className="text-sm sm:text-lg font-semibold text-gray-800">
              Title: <span className="text-blue-800">{post.title}</span>
            </p>
            <p className="text-sm sm:text-[20px] font-semibold text-gray-800">
              Posted by:{" "}
              <Link
                to={`/user/${post.userId}`}
                className={`${
                  userSession?.userId === post.userId
                    ? "text-red-800"
                    : "text-blue-800"
                }`}
              >
                {post.userId === userSession?.userId ? "You" : post.postedBy}
              </Link>
            </p>
            <p className="text-[14px] sm:text-[20px] text-gray-700 mt-1">
              Posted on: {post.datePosted} {post.isEdited && "(Edited)"}
            </p>
          </div>
          {isEditable && userSession?.userId === post.userId && (
            <div className="flex gap-2 mt-3">
              <Link
                to={`/edit/${post.postId}`}
                className="flex items-center justify-center px-4 py-1 bg-orange-400 text-white rounded-xl hover:bg-orange-500 h-10 hover:scale-105 transition-all duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => deletePost(post.postId)}
                className="flex items-center justify-center px-2 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 hover:cursor-pointer transition-all duration-300 hover:scale-105 text-center h-10"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <p className="mt-4 text-black break-words text-sm sm:text-base leading-relaxed border border-gray-500 rounded-xl p-4 bg-slate-300 shadow-xl hover:shadow-lg transition-shadow duration-300 ease-in-out">
          {post.message}
        </p>
      </div>
    </li>
  );
}

export default PostCard;
