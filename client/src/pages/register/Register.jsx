import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
   
  const navigate=useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    axios.post("http://localhost:8000/upload", formdata).then(
     (res)=>{
      axios.post("http://localhost:8000/auth/register", {username,email,password,img:res.data}).then(
        (res)=>{
          if(res.data){
            navigate('/login');
          }
        }
      )

     }
    );
  };

  return (
    <div>
      <div className="logincon">
        <div className="con">
          <h1 className="h1">Register</h1>
          <input
            className="input"
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="input"
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="input"
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="file"
            name="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <button onClick={handleClick}>Register</button>
          <span>
            you have already account{" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
