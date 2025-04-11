import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/query/GetPosts";
import PostCard from "../components/PostCard";

const Posts = () => {
  const { loading, data, error } = useQuery(GET_POSTS);
  const { posts } = data || {};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <React.Fragment>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          {posts.map((post: any) => {
            const { id, title, body, author } = post;

            return (
              <PostCard
                key={id}
                title={title}
                body={body}
                author={author.name}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Posts;
