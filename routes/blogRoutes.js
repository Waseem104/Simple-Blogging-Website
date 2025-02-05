const express = require("express");
const {
  getAllBlogsController,
  getSingleBlogController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getUserBlogsController,
} = require("../controller/blogController");

const router = express.Router();

// get all blogs || GET
router.get("/get-blogs", getAllBlogsController);

// get blog by id || GET
router.get("/get-blog/:id", getSingleBlogController);

// create blog post || POST
router.post("/create-blog", createBlogController);

// update blog post || PUT
router.put("/update-blog/:id", updateBlogController);

// delete blog post || DELETE
router.delete("/delete-blog/:id", deleteBlogController);

// get user blogs by user id || GET
router.get("/user-blogs/:id", getUserBlogsController);

module.exports = router;
