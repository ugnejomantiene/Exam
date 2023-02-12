import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";
import PostContext from "../../contexts/PostContext";
import AnswerContext from "../../contexts/AnswerContext";

const Post = ({ data, postContent }) => {
  const { users, loggedInUser } = useContext(UserContext);
  const { deletePost, likePost, dislikePost } = useContext(PostContext);
  const { answers } = useContext(AnswerContext);
  const postOwner = users.find(user => user.id === data.userId);
  const postAnswers = answers.filter(answer => answer.postId === data.id);
  const hasAnswer = postAnswers.length > 0;

  if (postContent === "answered" && !hasAnswer) {
    return null;
  }

  if (postContent === "unanswered" && hasAnswer) {
    return null;
  }

  return (
    <>
      <div className="post-item">
        <div className="post-header">
          <div className="post-header-left">
            <img src={postOwner.avatar} alt='logo' />
            <span>{postOwner.name}</span>
          </div>
          {postOwner.id === loggedInUser.id && (
            <div className="post-header-right">
              <button><Link to={`/editPost/${data.id}`}>Edit</Link></button>
              <button onClick={() => deletePost(data.id)}>Delete</button>
            </div>
          )}
        </div>
        <div className="post-title">
          <h2>{data.heading}</h2>{data.edited && <p>Edited</p>}
        </div>
        <div className="post-content">{data.content}</div>
        <div className="post-time">
          <p>{data.Time}</p>
        </div>
        <div className="post-footer">
          <div className="post-footer-left">
            <i className="fas fa-thumbs-up" onClick={() => likePost(data.id)}></i>
            <div className="post-like">
              <span>{data.likes} likes</span>
            </div>
            <i className="fas fa-thumbs-down" onClick={() => dislikePost(data.id)}></i>
            <div className="post-dislike">
              <span>{data.dislikes} dislikes</span>
            </div>
          </div>
          <div className="post-footer-right">
            <Link to={`/posts/${data.id}`}>
              {hasAnswer ? `${postAnswers.length} answer(s)` : "No answers yet"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;