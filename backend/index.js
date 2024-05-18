import { PORT, mongoDBURL } from './config.js';
import cors from "cors"
import express from "express";
import mongoose from "mongoose";
import artworkRoutes from "./controller/ArtworkRoute.js";
import authController from "./controller/authController.js"


const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',  // Frontend URL
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
