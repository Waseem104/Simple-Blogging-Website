import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/my-blog/user-blogs/${id}`);
      if (data?.success) {
        // console.log(data?.userBlogs?.blogs);
        setBlogs(data?.userBlogs?.blogs);
      }
    } catch (error) {
      console.log("error in get user blogs", error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <p>You Haven't Created Any Blogs</p>
      )}
    </div>
  );
};

export default UserBlog;
