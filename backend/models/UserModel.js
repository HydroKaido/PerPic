import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        user: {
            type: String,
            enum: ['Admin', 'User'],
            default: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)
const User = mongoose.model('User', UserSchema);

export {User}
