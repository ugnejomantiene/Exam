import React, { useContext, useState } from 'react';
import PostContext from '../../contexts/PostContext';
import Post from './Post';


const Posts = () => {
  const { posts } = useContext(PostContext);
  const [postContent, setPostContent] = useState("all");
  const [postSort, setPostSort] = useState("asc");

  const handleFilterChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleSortChange = (e) => {
    setPostSort(e.target.value);
  };

  const sortedPosts = posts.sort((a, b) => {
    if (postSort === "asc") {
      return new Date(a.Time) - new Date(b.Time);
    } else {
      return new Date(b.Time) - new Date(a.Time);
    }
  });

  return (
    <>
      <div className="posts-container">
        <div className="filter-container">
          <label htmlFor="post-filter">Show:</label>
          <select id="post-filter" value={postContent} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="answered">Answered</option>
            <option value="unanswered">Unanswered</option>
          </select>
          <label htmlFor="post-sort">Sort:</label>
          <select id="post-sort" value={postSort} onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {sortedPosts.map(post => (
          <Post key={post.id} data={post} postContent={postContent} />
        ))}
      </div>
    </>
  );
}

export default Posts;
