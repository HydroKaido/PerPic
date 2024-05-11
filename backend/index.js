import { PORT, mongoDBURL } from './config.js';
import cors from "cors"
import express from "express";
import mongoose from "mongoose";
import artworkRoutes from "./routes/ArtworkRoute.js"


const app = express();
app.use(
    cors({
      origin: "https://per-pic.vercel.app/",
      methods: ["GET", "PUT", "POST", "DELETE"],
      allowedHeaders: ["Content-Type"]
    })
  );

app.use(express.json());
app.use('/artwork', artworkRoutes);
app.use('/uploads', express.static('uploads'))
app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send("Welcome to Rice Field Bitch");
  });

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
