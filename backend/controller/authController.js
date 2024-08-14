import express from "express";
import { User } from "../models/UserModel.js";
import bycript from 'bcrypt'

import { generateToken } from "../utils/jwtUtils.js";

const router = express.Router();

//https://medium.com/@vahidnety/how-to-hash-password-string-in-a-mern-app-986ed03be8cf
router.post('/register', async (req, res)=> {
    try {
        const {username, email, password} = req.body;
        //if no input inserted display an error
        if(!email || !username || !password) {
            return res.status(400).json({error: 'Please input the field'})
        }

        if(password.length < 6){
            return res.status(400).json({error: 'Password is too low'})
        }
        //if the email is already exist use a findOne
        const emailExist = await User.findOne({email: email})
        //showing the error if the email is already exist
        if(emailExist){
            return res.status(400).json({error: 'Email is already exist'})
        }
        //hashing the password to be more secured
        const hashpassword = await bycript.hash(password, 10)
        //creating data to insert it on the Mongoose 
        const register = await User.create(
            {
                username: username,
                email: email,
                password: hashpassword,
            });
        return res.status(200).json({message: 'Create User Account', register: register})
    } catch (error) {
        return res.status(400).json({error: error})
    }
})


router.post('/login', async (req, res)=> {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: 'Please input the field'})
        }
        //find the email user to specify
        const user = await User.findOne({ email: email });
        if(!user) {
            return res.status(400).json({error: 'No user available'})
        }
        //decrypt the password and then compare it if the password is match
        const passwordDecrypt = await bycript.compare(password, user.password);
        //displaying the 
        if(passwordDecrypt){
            const token = generateToken(user);
            return res.status(200).json({message: 'You are login now', token, email: user.email});
        }else {
            return res.status(400).json({error: 'The password is incorrect'})
        }
    } catch (error) {
        return res.status(500).json('Something happen i dont know what it is')
    }
})


export default router;