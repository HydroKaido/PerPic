import express from "express"
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
      res.status(500).send({ message: error.message });
    }
  });

router.post('/', async (req, res) => {
  
    try {
        const newArtwork = {
            title: req.body.title,
            description: req.body.description,
            dateTime: req.body.dateTime,
        };
        const artwork = await Artwork.create(newArtwork);
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
        return res.status(404).json({ message: "Their is no data" });
      }
      return res.status(200).json(artworkId);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Artwork.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ message: "Artwork not found" });
      }
      return res.status(200).send({ message: "Artwork is Deleted" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  });
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Artwork.findByIdAndUpdate(id, req.body);
      if (!result) {
        return res.status(404).json({ message: "The artwork is not updating" });
      }
      return res.status(200).send({ message: "The artwork is updating" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
export default router;
