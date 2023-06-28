import jwt from "jsonwebtoken";
import { db } from "../connection/db.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  try {
    if (token) {
      jwt.verify(token, "jeel@1234", (err, data) => {
        if (err) return res.json(err);
        if (data) {
          const q = "SELECT * FROM user WHERE id=?";
          db.query(q, [data.id], (err, data) => {
            if (err) return res.json(err);
            if (!data.length) {
              return res.send({massage:"user has not exists!",sucess:false});
            }
            req.userid=data[0].id;
            next();
          });
        }
      });
    } else {
      res.send({massage:"You are not authenticate",sucess:false});
    }
  } catch (error) {
    console.log(error);
  }
};

  
