import express from "express";
import multer from "multer";
import path from "path";
import { Artwork } from "../models/ArtworkModel.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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


router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, description, dateTime } = req.body;
        if (!title || !description || !dateTime) {
            return res.status(400).json({ error: "Title, description, and dateTime are required" });
        }
        const newArtwork = await Artwork.create({
            title,
            description,
            dateTime,
            image: req.file ? req.file.path : null,
            userId: req.user.id
        });
        return res.status(201).json({ message: "Artwork created successfully", artwork: newArtwork });
    } catch (error) {
        console.error("Error creating artwork:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


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
