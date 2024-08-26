import express from "express";
import multer from "multer";
import { Artwork } from "../models/ArtworkModel.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { User } from "../models/UserModel.js";
import { generateToken } from "../utils/jwtUtils.js";
import fs from "fs";
import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import stream from 'stream';
import path from "path";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.memoryStorage();
const upload = multer({ storage });

const KEYFILEPATH = path.join(__dirname, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

router.post("/upload", authenticateToken, upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
  
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
  
    try {
      const response = await drive.files.create({
        requestBody: {
          name: req.file.originalname,
          mimeType: req.file.mimetype,
          parents: [process.env.FOLDER],
        },
        media: {
          mimeType: req.file.mimetype,
          body: bufferStream,
        },
      });
      const userId = req.user.id;
      const { title, description, dateTime } = req.body;
      if (!title || !description || !dateTime) {
          return res.status(400).json({ error: "Title, description, and dateTime are required" });
      }
      const newArtwork = await Artwork.create({
          title: title,
          description: description,
          dateTime: dateTime,
          image: response.data.id,
          userId: userId
      });
      return res.status(200).json({ message: "Artwork created successfully", artwork: newArtwork });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("An error occurred while uploading the file.");
    }
  });

router.get("/user", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const artworks = await Artwork.find({ userId });
        const user = { id: userId, email: req.user.email };
        return res.status(200).json({
            user,
            artworks,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.put("/user/update/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const updatedUser = await User.findByIdAndUpdate( id, { email: email }, { new: true} );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Email updated successfully", updatedUser });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});



router.put("/dashboard/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        if (!updateUser) {
            return res.status(404).json({ message: "Users cannot update" });
        }
        const newToken = generateToken(updateUser);
        return res.status(200).json({message: 'Update User', token: newToken})
    } catch(error) {
        console.log(error.message)
    }
})

router.get("/all", async (req, res) => {
    try {
        const artwork = await Artwork.find({});
        return res.status(200).json({
            count: artwork.length,
            data: artwork,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/user', authenticateToken, async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await user.findById({userId});
    } catch (error) {
        return res.status(500).json({message: 'Error'});
    }
})


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const artworkId = await Artwork.findById(id);
        if (!artworkId) {
            return res.status(404).json({ message: "Artwork not found" });
        }
        return res.status(200).json(artworkId);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Artwork.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Artwork not found" });
        }
        return res.status(200).json({ message: "Artwork deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Artwork.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: "Artwork not found" });
        }
        return res.status(200).json({ message: "Artwork updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
