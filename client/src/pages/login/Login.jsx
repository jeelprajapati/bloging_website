import React, { useState } from 'react'
import './Login.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate=useNavigate();
  const handleClicked=async(e)=>{
   e.preventDefault();
    const res=await axios.post("http://localhost:8000/auth/login", {username,password})
    localStorage.setItem("user",JSON.stringify(res.data))
    navigate('/');
  }
  return (
    <div className='logincon'>
      <div className="con">
       <h1 className='h1'>Login</h1>
       <input className='input' type="text" placeholder='username' onChange={(e)=>{setUsername(e.target.value)}}/>
       <input className='input' type="password" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
       <button onClick={handleClicked}>Login</button>
       <span>create account <Link className='link' to='/register'>Register</Link></span>
       </div>
    </div>
  )
}

export default Login
