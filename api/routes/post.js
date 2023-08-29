import express from "express";
const route=express.Router();
import { db } from "../connection/db.js";
import { verifyToken } from "../middleware/verifytoken.js";
//GET ALL POST
route.get('/',(req,res)=>{
    const q=req.query.cat ? "SELECT * FROM post WHERE cat=?" : "SELECT * FROM post";
    if(req.query.cat){
        db.query(q,[req.query.cat],(err,data)=>{
            if(err) return res.json(err);
    
            if(data) return res.json(data)
        })
    }
     else{
        db.query(q,(err,data)=>{
            if(err) return res.json(err);
    
            if(data) return res.json(data)
        })
    }
})
//GET SINGLE POST  
route.get('/:id',(req,res)=>{
    const q="SELECT p.id,`title`,`cat` , `desc` , `username`,p.img ,u.img AS userImg FROM user u JOIN post p ON u.id=p.userid WHERE p.id=?";
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        
        if(data) return res.json(data)
    })
})
//ADD POST
route.post('/add',verifyToken,(req,res)=>{
    const q="INSERT INTO post(`title`,`desc`,`userid`,`cat`,`img`) VALUES (?,?,?,?,?)";
    const postData=[
        req.body.title,
        req.body.desc,
        req.userid, 
        req.body.cat,
        req.body.img
    ]
    db.query(q,postData,(err,data)=>{
        if(err) return res.json({massage:"error in server",success:false});
        if(data) return res.json({massage:"post added sucessfully",success:true})
    })

})
//DELETE POST
route.delete('/:id',verifyToken,(req,res)=>{
    const q="DELETE FROM POST WHERE id=?";
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json({massage:"error in server",success:false});
        if(data) return res.json({massage:"post deleted sucessfully",success:true});
    })
})
//UPDATE POST
route.put('/:id',verifyToken,(req,res)=>{
    const q="UPDATE POST SET `title`=?,`desc`=?,`cat`=?,`img`=? WHERE id=?"
    const postData=[
        req.body.title,
        req.body.desc,
        req.body.cat,
        req.body.img
    ]
    db.query(q,[...postData,req.params.id],(err,data)=>{
        if(err) return res.json({massage:"error in server",success:false});
        if(data) return res.json({massage:"post updated sucessfully",success:true})
    })  
})


export default route
