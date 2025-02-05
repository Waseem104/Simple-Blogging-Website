import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/my-blog/get-blogs");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log("error in get all blogs", error);
    }
  };

  useEffect(() => {
    getAllBlogs();
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
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            key={blog?._id}
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog?.createdAt}
          />
        ))}
    </div>
  );
};

export default Blogs;
