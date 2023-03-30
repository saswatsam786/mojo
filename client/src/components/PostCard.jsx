import React from "react";
import CardBody from "./home/post_card/CardBody";
import CardFooter from "./home/post_card/CardFooter";
import CardHeader from "./home/post_card/CardHeader";
import Comments from "./home/Comments";
import InputComment from "./home/InputComment";

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <div key={post._id} className="card my-3">
      <CardHeader post={post} />
      <CardBody post={post} />
      <CardFooter post={post} />
      <Comments post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default PostCard;
