import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // state
  const [input, setInput] = useState({
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
      const { data } = await axios.post("/my-blog/login", {
        email: input.email,
        password: input.password,
      });

      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User Login successfully!");

        setTimeout(() => {
          navigate("/");
        }, 1000); // Slightly longer than autoClose
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
              Login
            </Typography>

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
              Login
            </Button>

            <Button
              variant="text"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/register")}
            >
              Not a User ? Please Register
            </Button>
          </Paper>
        </Box>
      </form>
    </>
  );
};

export default Login;
