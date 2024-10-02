import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.model.js";

//login user
// Login User
export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "The user does not exist",
      });
    }
    
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Password does not match",
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    
    // Send a single response with token and success message
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token, // Include the token in the response
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// registration of user
export const registerUser = async (req, res) => {
  const { Username, Email, Password } = req.body;
  try {
    const userExist = await User.findOne({ Email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashPassowrd = await bcrypt.hash(Password, 10);
    const newuser = new User({ Username, Email, Password: hashPassowrd });
    await newuser.save();
    res.status(200).json({
      success: true,
      message: " user has been created sucessful",
    });
  } catch (error) {
    res.status(500).json({
      sucess: true,
      message: error.message,
    });
  }
};
