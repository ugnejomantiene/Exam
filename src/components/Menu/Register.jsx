import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const Register = () => {
  const { users, addNewUser, setLoggedInUser } = useContext(UserContext);
  const navigation = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('email is required').min(3, 'email must be at least 3 characters'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    passwordRepeat: Yup.string().required('Please repeat your password').oneOf([Yup.ref('password'), null], 'Passwords do not match'),
    avatar: Yup.string().url('Please enter a valid URL'),
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters')
  });

  const handleSubmit = (values) => {
    if (users.find(user => user.email === values.email)) {
      alert("User with such name already exists.");
    } else {
      let newUser = {
        ...values,
        id: Date.now()
      };
      addNewUser(newUser);
      setLoggedInUser(newUser);
      navigation('/');
    }
  }

  return (
    <>
      <div className="loginRegister">
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>
      <h1>Registration</h1>
      <div className="FormRegister">
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
            avatar: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <label>
                Name:
                <Field name="name" type="text" />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}
              </label>
              <label>
                Email:
                <Field name="email" type="email" />
                {errors.email && touched.email ? <div>{errors.email}</div> : null}
              </label>
              <label>
                Password:
                <Field name="password" type="password" />
                {errors.password && touched.password ? <div>{errors.password}</div> : null}
              </label>
              <label>
                Repeat Password:
                <Field name="passwordRepeat" type="password" />
                {errors.passwordRepeat && touched.passwordRepeat ? <div>{errors.passwordRepeat}</div> : null}
              </label>
              <label>
                User picture:
                <Field name="avatar" type="url" />
                {errors.avatar && touched.avatar ? <div>{errors.avatar}</div  > : null}
              </label>
              <button type="submit">Register</button>

            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Register;
