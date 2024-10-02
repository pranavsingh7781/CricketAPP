import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: [true, " Name is required "],
    trim: true,
  },
  Email: {
    type: String,
    required: [true, "Email is also required"],
    trim: true,
    unique: true,
  },
  Password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
