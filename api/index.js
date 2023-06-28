import express, { json } from 'express';
import { db } from './connection/db.js';
import cors from 'cors';
import authroute from "./routes/auth.js"
import postroute from "./routes/post.js"
import fileupload from "./routes/upload.js"
import cookieParser from 'cookie-parser';
const app=express();
app.use(express.json());
app.use(cookieParser());
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 app.use(cors(corsOptions));

app.use('/auth',authroute);
app.use('/post',postroute);
app.use('/upload',fileupload);

app.listen(8000,()=>{
   console.log("app started!")
})