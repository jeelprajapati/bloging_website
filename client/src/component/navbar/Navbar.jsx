import React, { useEffect, useState } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import Warning from '../warning/Warning';
const Navbar = () => {
  
  const [data,setData]=useState(null);
  
  useEffect(()=>{
    setData(JSON.parse(localStorage.getItem('user')))
  },[])
  return (
    <>
    <div className='navcon'>
      <div className="navbar">
      <Link className='linktext' to='/'><div className="logo">jeel's Blog</div></Link>
      <div className="roots">
        <ul>
          <Link className='linktext' to='/?cat=art'><li>ART</li></Link>
          <Link className='linktext' to='/?cat=cinema'><li>CINEMA</li></Link>
          <Link className='linktext' to='/?cat=technology'><li>TECHNOLOGY</li></Link>
          <Link className='linktext' to='/?cat=science'><li>SCIENCE</li></Link>
          <Link className='linktext' to='/?cat=design'><li>
            DESIGN
          </li></Link>
          <Link className='linktext' to='/?cat=food'><li>FOOD</li></Link>
        </ul>
        <span className='span'>{data?.username}</span>
        {localStorage.getItem('user')?<span className='span'>Logout</span>:
        <Link className='linktext' to='/login'><span className='span'>Login</span></Link>}
        <span className='write'>
          <Link className='wlink' to='/write'>write</Link>
        </span>
      </div>
      </div>
    </div>
    </>
  )
}

export default Navbar
