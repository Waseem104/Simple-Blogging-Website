import React, { useState } from "react";
import {
  Box,
  AppBar,
  Button,
  Typography,
  Toolbar,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { toast } from "react-toastify";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // local state
  const [value, setValue] = useState();

  // logout function
  const handleLogout = () => {
    dispatch(authActions.logout());
    toast.success("User Successfully Logged Out");

    setTimeout(() => {
      navigate("/login");
    }, 1200);
    localStorage.clear();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #1E3C72 0%, #2A5298 100%)",
        padding: "5px 20px",
      }}
    >
      <Toolbar>
        {/* Logo / Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            letterSpacing: "1px",
            color: "white",
          }}
        >
          My Blog App
        </Typography>

        {/* Navigation Tabs */}
        {isLogin && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              sx={{
                "& .MuiTab-root": {
                  fontSize: "16px",
                  fontWeight: "500",
                  textTransform: "capitalize",
                  color: "white",
                  "&:hover": {
                    color: "#FFD700",
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#FFD700",
                },
              }}
            >
              <Tab label="Blogs" component={Link} to="/blogs" />
              <Tab label="My Blogs" component={Link} to="/my-blogs" />
              <Tab label="Create Blog" component={Link} to="/create-blog" />
            </Tabs>
          </Box>
        )}

        {/* Authentication Buttons */}
        <Box display={"flex"} marginLeft={"auto"}>
          {!isLogin && (
            <>
              <Button
                sx={{ margin: 1, color: "white" }}
                LinkComponent={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                sx={{ margin: 1, color: "white" }}
                LinkComponent={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
          {isLogin && (
            <>
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
