import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import UserContext from "../../contexts/UserContext";
import AnswerContext from "../../contexts/AnswerContext";

const Answers = () => {
  const { id } = useParams();
  const [postAnswers, setPostAnswers] = useState([]);
  const [, setHasAnswer] = useState(false);
  const { users, loggedInUser } = useContext(UserContext);
  const { answers, addNewAnswer, deleteAnswer, likeAnswer, dislikeAnswer } = useContext(AnswerContext);

  useEffect(() => {
    const postAnswers = answers.filter(answer => answer.postId === id);
    setPostAnswers(postAnswers);
    setHasAnswer(postAnswers.length > 0);
  }, [answers, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnswer = {
      postId: id,
      userId: loggedInUser.id,
      content: e.target[0].value,
      id: nanoid(),
      edited: false,
      Time: new Date().toLocaleString(),
      likes: 0,
      dislikes: 0
    };
    addNewAnswer(newAnswer);
    e.target[0].value = "";
  };


  return (
    <>
      <div className="post-answers">
        {
          postAnswers.map(answer => {
            const answerOwner = users.find(user => user.id === answer.userId);
            return (
              <div className="Post" key={answer.id}>
                <img src={answerOwner.avatar} alt="user avatar" />
                <div className="name">
                  <span>{answerOwner.name}</span>
                </div>
                {
                  loggedInUser && loggedInUser.id === answerOwner.id &&
                  <>
                    <div className="buttons">
                      <i className="fas fa-trash-alt" onClick={() => deleteAnswer(answer.id)}></i>
                      <Link to={`/editAnswer/${answer.id}`}><i className="fas fa-edit"></i></Link>
                    </div>
                  </>
                }
                <div className="edited">
                  {answer.edited && <p>Edited</p>}
                </div>
                <div className="content">
                  <p>{answer.content}</p>
                </div>
                <div className="Time">
                  <p>{answer.Time}</p>
                </div>
                <div className="Likes">
                  <i className="fas fa-thumbs-up" onClick={() => likeAnswer(answer.id)}></i>
                  <span>{answer.likes}</span>
                </div>
                <div className="Dislike">
                  <i className="fas fa-thumbs-down" onClick={() => dislikeAnswer(answer.id)}></i>
                  <span>{answer.dislikes}</span>
                </div>
              </div>
            )
          })
        }
      </div>
      <form className="post-answer-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Your answer" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Answers;