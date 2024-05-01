import { PORT, mongoDBURL } from './config.js';
import express from "express";
import mongoose from "mongoose";
import artworkRoutes from "./routes/ArtworkRoute.js"

const app = express();

app.use(express.json());
app.use('/artwork', artworkRoutes);

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
