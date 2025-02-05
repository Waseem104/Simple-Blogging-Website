const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controller/userController");

const router = express.Router();

// get all user || GET
router.get("/all-users", getAllUsers);

// register route || POST
router.post("/register", registerController);

// login route || POST
router.post("/login", loginController);
module.exports = router;
