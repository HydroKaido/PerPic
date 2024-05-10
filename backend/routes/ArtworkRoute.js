import express from "express";
import { Artwork } from "../models/ArtworkModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
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

router.post('/', async (req, res) => {
    try {
        const { title, description, dateTime } = req.body;

        // Basic validation, you might want to add more as per your requirements
        if (!title || !description || !dateTime) {
            return res.status(400).json({ error: "Title, description, and dateTime are required" });
        }

        const newArtwork = await Artwork.create({
            title,
            description,
            dateTime,
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
