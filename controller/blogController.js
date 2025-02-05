const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

// get all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(400).json({ message: "No blogs Found" });
    }

    return res.status(200).json({
      message: "All Blogs are fetched",
      success: true,
      blogsCount: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log("error in get all blogs controller", error);
    return res.status(500).json({ message: "Some internal server error" });
  }
};

// get single blog
exports.getSingleBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(400).json({ message: "blog not found" });
    }
    return res
      .status(200)
      .json({ message: "successfully fetched all blogs", success: true, blog });
  } catch (error) {
    console.log("error in get single blog controller", error);
    return res
      .status(500)
      .json({ message: "some internal server error", success: false });
  }
};

// create new blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    // validation
    if (!title || !description || !image || !user) {
      return res.status(400).json({
        message: "Please Provide all Fields",
        success: false,
      });
    }
    const existingUser = await userModel.findById(user);
    // validation
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "unable to find user", success: false });
    }
    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    newBlog.save();
    return res.status(200).json({
      message: "successfully created the new Blog",
      success: true,
      newBlog,
    });
  } catch (error) {
    console.log("error in create blog controller", error);
    return res.status(500).json({ message: "some internal server error" });
  }
};

// update blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const isExist = await blogModel.findById(id);
    if (!isExist) {
      return res
        .status(400)
        .json({ message: "user not found", success: false });
    }

    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "successfully updated the blog", success: true, blog });
  } catch (error) {
    console.log("error in update blog", error);
    return res.status(500).json({ message: "some internal server error" });
  }
};

// delete blog
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findByIdAndDelete({ _id: req.params.id }) // Ensure correct query
      .populate("user");

    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }

    if (blog.user) {
      await blog.user.blogs.pull(blog._id); // Ensure `blog._id` is used
      await blog.user.save();
    }
    return res
      .status(200)
      .json({ message: "successfully deleted the blog", success: true });
  } catch (error) {
    console.log("error in update blog", error);
    return res.status(500).json({ message: "some internal server error" });
  }
};

// get user blogs || GET
exports.getUserBlogsController = async (req, res) => {
  try {
    const userBlogs = await userModel.findById(req.params.id).populate("blogs");

    if (!userBlogs) {
      return res
        .status(404)
        .json({ message: "blogs not found with this user", success: true });
    }

    return res.status(200).json({
      message: "user blogs fetched successfully",
      success: true,
      userBlogs,
    });
  } catch (error) {
    console.log("error in get user blogs controller", error);
    return res.status(500).json({ message: "some internal server error" });
  }
};
