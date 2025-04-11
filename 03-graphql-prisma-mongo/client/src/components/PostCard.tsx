import { FC } from "react";

type PostCardProps = {
  title: string;
  body: string;
  author: string;
};

const PostCard: FC<PostCardProps> = ({ title, body, author }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-left">{body}</p>
        <p className="text-right">
          Author: <span className="font-bold">{author}</span>
        </p>
      </div>
    </div>
  );
};

export default PostCard;
