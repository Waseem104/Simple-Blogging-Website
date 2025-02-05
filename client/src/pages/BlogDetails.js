import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, TextField, Paper, Box, Typography } from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [inputs, setInputs] = useState({});

  const id = useParams().id;
  const navigate = useNavigate();

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/my-blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log("Error in getting blog details:", error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/my-blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated Successfully!");
        setTimeout(() => {
          navigate("/my-blogs");
        }, 1000);
      }
    } catch (error) {
      console.log("Error in updating blog:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ backgroundColor: "#f5f5f5", padding: "20px" }}
        >
          <Paper
            elevation={10}
            sx={{
              padding: "40px",
              borderRadius: "10px",
              maxWidth: "500px",
              width: "100%",
              textAlign: "center",
              backgroundColor: "#ffffff",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={600}
              mb={3}
              color="primary"
              sx={{ textTransform: "uppercase", letterSpacing: "1px" }}
            >
              Update Blog
            </Typography>

            <TextField
              label="Title"
              name="title"
              type="text"
              value={inputs.title}
              onChange={handleChange}
              required
              fullWidth
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                shrink: true, // Ensures the label does not overlap
              }}
            />

            <TextField
              label="Description"
              name="description"
              value={inputs.description}
              onChange={handleChange}
              required
              fullWidth
              margin="dense"
              variant="outlined"
              multiline
              rows={4}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label="Image URL"
              name="image"
              value={inputs.image}
              onChange={handleChange}
              required
              fullWidth
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                padding: "12px",
                fontWeight: 600,
                borderRadius: "5px",
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
              type="submit"
            >
              Update Blog
            </Button>
          </Paper>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
