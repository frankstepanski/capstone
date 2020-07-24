import React, { useState } from "react";

import "./Blog.css";

const Blog = () => {

  const [posts, setPosts] = useState([{}]); // array of posts

    return (
      <div className="blog">
        <h2>Blog</h2>
        <p>Simple blog (ordered by date) and no comment functonality.</p>       
      </div>
    );
  };


export default Blog;