import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const navigate = useNavigate();

  const id = localStorage.getItem("userId");
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/my-blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created successfully!");

        setTimeout(() => {
          navigate("/my-blogs");
        }, 1000);
      }
      // console.log(inputs);
    } catch (error) {
      console.log("error in create Blog", error);
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
          bgColor="#f5f5f5"
        >
          <Paper
            elevation={10}
            sx={{
              padding: 4,
              borderRadius: 3,
              maxWidth: 500,
              width: "100%",
              textAlign: "center",
              backgroundColor: "#f7f7f7",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" fontWeight={600} mb={3} color="primary">
              Create New Blog
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
              sx={{
                marginBottom: "20px",
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />

            <TextField
              label="Description"
              name="description"
              value={inputs.description}
              onChange={handleChange}
              type="text"
              required
              fullWidth
              margin="dense"
              variant="outlined"
              multiline
              rows={4} // To increase the height of the textarea
              sx={{
                marginBottom: "20px",
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />

            <TextField
              label="Image URL"
              name="image"
              value={inputs.image}
              onChange={handleChange}
              type="text"
              required
              fullWidth
              margin="dense"
              variant="outlined"
              sx={{
                marginBottom: "20px",
                backgroundColor: "#fff",
                borderRadius: "5px",
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
              Create Blog
            </Button>
          </Paper>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
