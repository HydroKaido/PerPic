import mongoose from "mongoose";

const ArtworkSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        dateTime: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
        
    },
    {
        timestamp: true
    }
)

const Artwork = mongoose.model('Artwork', ArtworkSchema);

export { Artwork };