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

export default router;
