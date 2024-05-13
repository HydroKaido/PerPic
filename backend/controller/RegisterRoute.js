import express from "express";
import { Register } from '../models/RegisterModel.js'

const router = express.Router();


router.post("/", async (req, res) => {
    try{
        const {username, email, password} = req.body;
        if(!email || !username || !password){
            return res.status(400).json('username, email and password is required');
        }
        const register = await Register.create({
            email, username, password
        });
        return res.status(200).json({message : 'Your account is now register', register : register});
    }catch(err){
        return res.status(500).json('Internal Error shit')
    }
})

export default router;