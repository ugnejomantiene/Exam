import PostContext from "../../contexts/PostContext";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPostForm = () => {

  const { id } = useParams();

  const { posts, updatePost } = useContext(PostContext);

  const currentPost = posts.find(post => post.id.toString() === id)

  const navigation = useNavigate();

  const [formInputs, setFormInputs] = useState({
    heading: currentPost.heading,
    content: currentPost.content
  });

  const handleSubmit = e => {
    e.preventDefault();

    updatePost(id, formInputs);

    navigation('/');
  }

  return (
    <>
      <div className="FormPost">
        <form onSubmit={handleSubmit}>
          <label>
            Heading:
            <input type="text" name="heading"
              value={formInputs.heading}
              onChange={(e) => setFormInputs({ ...formInputs, heading: e.target.value })}
            />
          </label>
          <label>
            Content:
            <input type="text" name="content"
              value={formInputs.content}
              onChange={(e) => setFormInputs({ ...formInputs, content: e.target.value })}
            />
          </label>
          <input type="submit" value="Edit Post" />
        </form>
      </div>
    </>
  );
}

export default EditPostForm;