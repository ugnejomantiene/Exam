import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PostContext from "../../contexts/PostContext";

const EditPostForm = () => {

  const { id } = useParams();

  const { posts, updatePost } = useContext(PostContext);

  const currentPost = posts.find(post => post.id === id);

  const navigation = useNavigate();

  const validationSchema = Yup.object().shape({
    heading: Yup.string().required('Heading is required').min(3, 'Heading must be at least 3 characters'),
    content: Yup.string().required('Content is required').min(3, 'Content must be at least 3 characters'),
  });

  const handleSubmit = (values) => {
    updatePost(id, values);
    navigation('/');
  }

  return (
    <>
      <div className="FormPost">
        <Formik
          initialValues={{
            heading: currentPost.heading,
            content: currentPost.content,
            edited: true
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <label>
                Heading:
                <Field name="heading" type="text" />
                {errors.heading && touched.heading ? <div>{errors.heading}</div> : null}
              </label>
              <label>
                Content:
                <Field name="content" type="text" />
                {errors.content && touched.content ? <div>{errors.content}</div> : null}
              </label>
              <input type="submit" value="Edit Post" />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default EditPostForm;