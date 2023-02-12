import './App.css';
import Header from './components/Menu/Header';
import Main from './components/Main';
import Login from './components/Menu/Login';
import NewPostForm from './components/Post/NewPostForm';
import Register from './components/Menu/Register';
import EditPostForm from './components/Post/EditpostForm';
import EditAnswerForm from './components/Post/EditAnswerForm';
import Footer from './components/Menu/Footer';
import { Routes, Route } from 'react-router-dom';
import Answers from './components/Post/Answers';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Main />} />
          <Route path="/newPost" element={<NewPostForm />} />
          <Route path="/editPost/:id" element={<EditPostForm />} />
          <Route path="/editAnswer/:id" element={<EditAnswerForm />} />
          <Route path="/posts/:id" element={<Answers />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;