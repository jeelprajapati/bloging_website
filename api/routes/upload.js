import express from "express";
import multer from "multer";
const route=express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/uploads')
    },
    filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
    }
  })
  
const upload = multer({ storage: storage })
route.post('/', upload.single('file'),(req, res) =>{
    const file=req.file;
    res.send(file.filename)
 });

 export default route