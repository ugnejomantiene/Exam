import { createContext, useState, useEffect } from "react";
import Monkey from "../components/img/monkey.gif";
import { useContext } from "react";
import UserContext from "./UserContext";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:5000/posts');
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">
      <img src={Monkey} alt="loading" />
    </div>
  }

  const filteredPosts = posts.filter(post => {
    if (filter === "answered") {
      return post.answer;
    } else if (filter === "unanswered") {
      return !post.answer;
    }
    return true;
  });

  const addNewPost = async (newPost) => {
    const res = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: { 'Content-Type': 'application/json' }
    });
    const updatedData = await res.json();
    setPosts([...posts, updatedData]);
  };

  const deletePost = async (id) => {
    await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE'
    });
    setPosts(posts.filter(post => post.id !== id));
  };

  const updatePost = async (id, updatedPost) => {
    await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedPost),
      headers: { 'Content-Type': 'application/json' }
    });
    setPosts(posts.map(post => post.id.toString() === id ? { ...post, ...updatedPost } : post));
  };

  const handleLike = async (id) => {
    const post = posts.find((post) => post.id === id);
    if (post.likedBy.includes(loggedInUser.id)) {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ likes: post.likes - 1, likedBy: post.likedBy.filter(userId => userId !== loggedInUser.id) }),
        headers: { 'Content-Type': 'application/json' }
      });
      const updatedData = await res.json();
      setPosts(posts.map(post => post.id.toString() === id ? { ...post, ...updatedData } : post));
    } else {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ likes: post.likes + 1, likedBy: [...post.likedBy, loggedInUser.id] }),
        headers: { 'Content-Type': 'application/json' }
      });
      const updatedData = await res.json();
      setPosts(posts.map(post => post.id.toString() === id ? { ...post, ...updatedData } : post));
    }
  };

  const handleDislike = async (id) => {
    const post = posts.find((post) => post.id === id);
    if (post.dislikedBy.includes(loggedInUser.id)) {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ dislikes: post.dislikes - 1, dislikedBy: post.dislikedBy.filter(userId => userId !== loggedInUser.id) }),
        headers: { 'Content-Type': 'application/json' }
      });
      const updatedData = await res.json();
      setPosts(posts.map(post => post.id.toString() === id ? { ...post, ...updatedData } : post));
    } else {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ dislikes: post.dislikes + 1, dislikedBy: [...post.dislikedBy, loggedInUser.id] }),
        headers: { 'Content-Type': 'application/json' }
      });
      const updatedData = await res.json();
      setPosts(posts.map(post => post.id.toString() === id ? { ...post, ...updatedData } : post));
    }
  };


  const value = {
    posts: filteredPosts,
    addNewPost,
    deletePost,
    updatePost,
    handleLike,
    handleDislike,
    filter,
    setFilter,
    loggedInUser
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
export { PostProvider };