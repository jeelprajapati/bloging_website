import React from 'react'
import './Warning.css'
import Delete from "../../image/download.png"

const Warning = ({setIsDelete,setWarn}) => {
  return (
    <div className='warn-container'>
      <div className="Warn-title">
        Delete
      </div>
      <div className="warn-massage">
        <img src={Delete} alt="" className="icon" />
        Are you sure, you want delete this post?
      </div>
      <div className="warn-button">
        <button className="warn-btn cancle" onClick={()=>{setIsDelete(false);setWarn(false)}}>
          cancle
        </button>
        <button className="warn-btn red" onClick={()=>setIsDelete(true)} >Delete</button>
      </div>
    </div>
  )
}

export default Warning
