export interface IPost {
  postId: string;
  userId: string;
  datePosted: string;
  postedBy: string;
  title: string;
  userImg: string;
  message: string;
  isEdited?: boolean;
}
