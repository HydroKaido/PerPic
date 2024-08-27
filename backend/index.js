import cors from "cors"
import express from "express";
import mongoose from "mongoose";
import artworkRoutes from "./controller/ArtworkRoute.js";
import authController from "./controller/authController.js"
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT

const app = express();
const corsOptions = {
  origin: 'https://per-pic.vercel.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Authorization,Origin,X-Requested-With,Content-Type,Accept',
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use('/', authController);
app.use('/artwork', artworkRoutes);

app.use('/uploads', express.static('uploads'))

app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send("Welcome to Rice Field Bitch");
  });

mongoose.connect(process.env.mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });