import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  // state
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/my-blog/register", {
        username: input.username,
        email: input.email,
        password: input.password,
      });

      if (data.success) {
        toast.success("Registered successfully!");
        // redirect to login afetr delay
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log("error in handleSubmit", error);
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
              maxWidth: 400,
              width: "100%",
              textAlign: "center",
              backgroundColor: "white",
            }}
          >
            <Typography variant="h5" fontWeight={600} mb={3} color="primary">
              Register
            </Typography>

            <TextField
              label="Full Name"
              name="username"
              type="text"
              value={input.name}
              onChange={handleChange}
              required
              fullWidth
              margin="dense"
            />

            <TextField
              label="Email"
              name="email"
              value={input.email}
              onChange={handleChange}
              type="email"
              required
              fullWidth
              margin="dense"
            />

            <TextField
              label="Password"
              name="password"
              value={input.password}
              onChange={handleChange}
              type="password"
              required
              fullWidth
              margin="dense"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1 }}
            >
              Sign Up
            </Button>

            <Button
              variant="text"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/login")}
            >
              Already Registered? Login
            </Button>
          </Paper>
        </Box>
      </form>
    </>
  );
};

export default Register;
