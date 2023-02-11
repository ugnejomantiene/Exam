import UserContext from "../../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const LogIn = () => {

  const [failedLogIn, setFailedLogIn] = useState(false);

  const navigation = useNavigate();

  const { users, setLoggedInUser } = useContext(UserContext);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const loggedInUser = users.find(user => user.email === values.email && user.password === values.password);

    if (!loggedInUser) {
      setFailedLogIn(true);
    } else {
      setLoggedInUser(loggedInUser);
      navigation('/');
    }

    setSubmitting(false);

  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  return (
    <>
      <div className="loginRegister">
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>
      <h1>Login</h1>
      <div className="Login">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="email"
                name="email"
                placeholder="Email"
              />
              <Field
                type="password"
                name="password"
                placeholder="Password"
              />
              <button type="submit" disabled={isSubmitting}>
                Log In, Bro
              </button>
              {
                failedLogIn && <span>Wrong log in info. Try again... </span>
              }
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default LogIn;