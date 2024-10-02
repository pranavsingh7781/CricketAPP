import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import connectodb from "./config/db.js";
import { v2 as cloudinary } from 'cloudinary';
import upload from "./middleware/Multermiddleware.js";
import authRoutes from './routes/authRoutes.js';
import playerRoutes from './routes/playerRoutes.js';

config();

const app = express();

//cloudinary setup
cloudinary.config(
    {
        cloud_name : process.env.CLOUD_NAME,
        api_key : process.env.API_KEY,
        api_secret : process.env.API_SECRET
    }
)
// database connection
connectodb();

//middleware    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Replace with your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(express.static("public"));
app.get("/api", (req, res) => [res.send("Hello from a new simple server ")]);

// Upload route
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.send('File uploaded successfully!');
  });
});
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);

export default app;
