import PostContext from "../../contexts/PostContext";
import UserContext from "../../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const NewPostForm = () => {

  const [formInputs, setFormInputs] = useState({
    heading: '',
    content: ''
  });

  const { addNewPost } = useContext(PostContext);
  const { loggedInUser } = useContext(UserContext);

  const navigation = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const newPost = {
      heading: formInputs.heading,
      content: formInputs.content,
      id: nanoid(),
      userId: loggedInUser.id,
      likes: 0,
      dislikes: 0,
      Time: new Date().toLocaleString(),
      edited: false
    };

    addNewPost(newPost);
    navigation('/');
  }

  return (
    <>
      <div className="FormAddPost">
        <form onSubmit={handleSubmit}>
          <label>
            Heading:
            <input type="text" name="heading" required
              value={formInputs.heading}
              onChange={(e) => setFormInputs({ ...formInputs, heading: e.target.value })}
            />
          </label>
          <label>
            Content:
            <input type="text" name="content" required
              value={formInputs.content}
              onChange={(e) => setFormInputs({ ...formInputs, content: e.target.value })}
            />
          </label>
          <input type="submit" value="Create new Post" />
        </form>
      </div>
    </>
  );
}

export default NewPostForm;