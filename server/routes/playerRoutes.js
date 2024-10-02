import express from 'express';
import { Verifytoken } from '../middleware/authmiddleware.js';
import {  addPlayer, getplayer,  } from '../Controllers/Playercontroller.js';
import upload from '../middleware/Multermiddleware.js';

const router = express.Router();

// Route to add a new player with image upload
router.post('/new', Verifytoken, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }
    // If no error, proceed to addPlayer
    addPlayer(req, res);
  });
});

// Route to get all players
router.get('/', Verifytoken, getplayer);

export default router;
