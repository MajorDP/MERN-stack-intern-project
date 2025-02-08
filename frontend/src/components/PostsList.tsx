import { IPost } from "../interfaces/IPosts";
import PostCard from "./PostCard";

interface IPostsList {
  posts: IPost[] | null;
  isEditable: boolean;
}
function PostsList({ posts, isEditable }: IPostsList) {
  return (
    <ul className=" flex flex-col items-center justify-center">
      {posts?.map((post, index) => (
        <PostCard post={post} key={index} isEditable={isEditable} />
      ))}
    </ul>
  );
}

export default PostsList;
