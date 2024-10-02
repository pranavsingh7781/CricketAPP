import { v2 as cloudinary } from "cloudinary";
import Player from "../Models/Player.model.js";

// Add player with the image
export const addPlayer = async (req, res) => {
  console.log(req.file); // Log the file object for debugging
  console.log(req.body);

  const { Name, Matches, Runs, Wickets } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded.",
    });
  }

  try {
    // Log received player data
    console.log("Player Data:", { Name, Matches, Runs, Wickets });
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new player with Cloudinary
    const NewPlayer = new Player({
      Name,
      Matches,
      Runs,
      Wickets,
      Imageurl: result.secure_url, // Cloudinary URL
    });

    await NewPlayer.save();
    res.status(200).json({
        success: true,
        message: "Player added successfully.",
        player: NewPlayer,
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get list of the players
export const getplayer = async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
