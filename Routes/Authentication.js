const express=require('express')
const router =express.Router()
const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User= require('../Model/user')                   //step 11 to require these files

const sendMail = require('../nodemailer/sendemail')


                                               
//user registration                                     //step 12 create register route
router.post('/register',async(req,res)=>{
    try {
        console.log(req.body);
        const {names,code,email}=req.body
        const encodedcode=await bcrypt.hash(code,10)
        const user =new User({
            names,
            code:encodedcode,
            email,
        })
        await user.save()
        res.status(201).json({
            messege:"user succesfully registered"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"registration failed"})
       
    }
})

//login                                        step 15

router.post('/login',async (req,res)=>{
    try {
        const {names,code,email} = req.body 
        const user = await User.findOne({names})
        if (!user){
            return res.status(401).json({error:"Login failed"})
        }
        const codeMatch = await bcrypt.compare(code,user.code)
        if(!codeMatch){
            return res.status(401).json({error:"Authentication failed"})
        }
        const token = jwt.sign({userId:user._id},"hhuhuu",{expiresIn:'1hr'})
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error:'login failed'})
        console.log(error)
    }
})

//forgot password                     step 16

router.post('/forgotpassword', async (req,res)=>{
    try {
        const {names} = req.body  
        const user =await User.findOne({names})
        // console.log(user)
        if (!user){
            return res.status(401).json({error:'user not found'})
        }
        const otp = Math.floor(Math.random() * 100000);
        // console.log(otp);
        const updateOtp =await User.findByIdAndUpdate(user._id,{otp:otp},{new:true})
        if (updateOtp) {
            sendMail(user.email, otp);
            // console.log(user.mailid);
            res.status(200).json({ message: "OTP sent to mail" });
          }
        //   return res.status(500).json({ error: "Failed senting" });
        } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "code incorrect" });
    }
})





module.exports=router