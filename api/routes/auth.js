import express from "express";
const route=express.Router();
import { db } from "../connection/db.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

//Register

route.post('/register',(req,res)=>{
    console.log(req.body)
    console.log('jeel')
    const q="SELECT * FROM user WHERE username=? OR email=?"
    db.query(q,[req.body.username,req.body.email],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("user have already exists!")
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const q="INSERT INTO user(`username`,`email`,`password`,`img`) VALUES (?,?,?,?)"
        const useraData=[
          req.body.username,
          req.body.email,
          hash,
          req.body.img
       ]
       db.query(q,useraData,(err,data)=>{
        if(err) return res.json(err);
        if(data){
            res.send("user added sucessfully")
        } 
       })
    })    
})

//Login 

route.post('/login',(req,res)=>{
    const q="SELECT * FROM user WHERE username=?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(!data.length){
            return  res.send("invalid username or password")
        }
        const result=bcrypt.compareSync(req.body.password,data[0].password);
        if(!result) return res.send("invalid username or password");
        const token=jwt.sign({
            id:data[0].id
        },'jeel@1234');
        const{password,...other}=data[0];

        res.cookie('accessToken',token).json({...other,token}); 
    })    
})

// Logout

route.post('/logout',(req,res)=>{
    res.clearCookie('access-token',{
        sameSite:"none",
        secure:true
    }).status(200).send("User has been logged out")
})

export default route