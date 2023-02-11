import AnswerContext from "../../contexts/AnswerContext";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditAnswerForm = () => {

  const { id } = useParams();

  const { answers, updateAnswer } = useContext(AnswerContext);

  const currentAnswer = answers.find(answer => answer.id === id);

  const navigation = useNavigate();

  const [formInputs, setFormInputs] = useState({
    content: currentAnswer.content
  });

  const handleSubmit = e => {
    e.preventDefault();
    updateAnswer(id, formInputs);

    navigation('/');

  }

  return (
    <>
      <div className="FormAnswer">
        <form onSubmit={handleSubmit}>
          <label>
            Content:
            <input type="text" name="content"
              value={formInputs.content}
              onChange={(e) => setFormInputs({ ...formInputs, content: e.target.value })}
            />
          </label>
          <input type="submit" value="Edit Answer" />
        </form>
      </div>
    </>
  );
}

export default EditAnswerForm;
