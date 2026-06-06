import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from 'validator'

const createToken = (id)=>{
     return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async(req,res)=>{
    try {
          const {name,email,password} = req.body;
        //  email already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }
        // vadidation
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Invalid email"})
        }
        if(password.length<4){
            return res.json({success:false, message:"Password must be at least 4 characters"})
        }
        if(!name || !password || !email){
            return res.json({success:false, message:"All fields are required"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await userModel.create({
            name,
            email,
            password:hashedPassword
        })
        const user = await newUser.save();
     const token = createToken(user._id);
        res.json({success:true, message:"User registered successfully",token})



    } catch (error) {
        res.status(500).json({success:false, message:"Error occurred while registering user"})
        console.log(error.message);
    }
}
const loginUser = async(req,res) => {
 try {
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({success:false, message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = createToken(user._id);
            res.json({success:true, message:"User logged in successfully",token})
        }
        else{
            res.json({success:false, message:"Invalid credentials"})
        }

 } catch (error) {
    res.json({success:false, message:"Error occurred while logging in user"})
    console.log(error.message);
 }
}
   

const adminLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET )
            res.json({success:true,message:"Admin Login Successfully",token})
        }else{
            res.json({success:false,message:"Invalid Crendentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}
export {loginUser,registerUser,adminLogin}