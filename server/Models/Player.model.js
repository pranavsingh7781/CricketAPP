import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    index: true, // Index for faster searching
  },
  Matches: {
    type: Number,
    required: [true, "Should have played at least 1 match"],
    min: [0, "Matches cannot be negative"], // Validation for non-negative
  },
  Runs: {
    type: Number,
    required: [true, "If there are no runs, write 0"],
    default: 0,
    min: [0, "Runs cannot be negative"], // Validation for non-negative
  },
  Wickets: {
    type: Number,
    required: [true, "If no wicket, write 0"],
    default: 0,
    min: [0, "Wickets cannot be negative"], // Validation for non-negative
  },
  Imageurl: {
    type: String,
    required: false,
  },
});

const Player = mongoose.model("Player", playerSchema);
export default Player;
