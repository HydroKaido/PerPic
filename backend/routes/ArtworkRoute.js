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


router.post("/", async (req, res) => {
    try {
      if (
        !req.body.title ||
        !req.body.description ||
        !req.body.dateTime
      ) {
        return res.status(201).send({
          message: "Sending Loves to my homie the title, publish, and created",
        });
      }
      const newArtwork = {
        title: req.body.title,
        description: req.body.description,
        dateTime: req.body.dateTime,
      };
      const diary = await Artwork.create(newArtwork);
      return res.status(200).send(diary);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
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
