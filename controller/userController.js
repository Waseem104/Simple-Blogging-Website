const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
// exports.getUser=()=>{};

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // validation
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please Provide All Fields", success: false });
    }

    // existing user
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res
        .status(401)
        .json({ message: "User Already Exist", success: false });
    }
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // save user
    const user = new userModel({ username, email, password: hashPassword });
    user.save();
    return res
      .status(200)
      .json({ message: "successfully registered", success: true });
  } catch (error) {
    console.log("error in registerController", error);
    return res
      .status(500)
      .json({ message: "Error in register Callback", success: false, error });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please Provide all Fields", success: false });
    }

    // is user not exist
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "user not found", success: false });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid username and password", success: false });
    }
    return res
      .status(200)
      .json({ message: "successfully logged In", success: true, user });
  } catch (error) {
    console.log("error in login controller", error);
    return res.status(500).json({ message: "some internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      message: "successfully fetched all users",
      success: true,
      userCount: users.length,
      users,
    });
  } catch (error) {
    console.log("error in getAllUsers", error);
    return res
      .status(500)
      .json({ message: "some internal server error,Please try again" });
  }
};
