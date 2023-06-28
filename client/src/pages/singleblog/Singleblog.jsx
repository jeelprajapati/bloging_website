import React, { useEffect, useState } from "react";
import "./Singleblog.css";
import axios from "axios";
import deleteicon from "../../image/delete.svg";
import updateicon from "../../image/update.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Warning from "../../component/warning/Warning";
const Singleblog = () => {

  const [singlePost, setSinglePost] = useState(null);
  const [cateItem, setCateItem] = useState(null);
  const[isDelete,setIsDelete]=useState(false);
  const[deleteId,setDeleteId]=useState(null);
  const [warn,setWarn]=useState(false)

  const navigate=useNavigate();

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const location = useLocation().pathname.split("/")[2];
  useEffect(() => {
    axios.get(`http://localhost:8000/post/${location}`).then((res) => {
      setSinglePost(res.data[0]);
      axios
        .get(`http://localhost:8000/post/?cat=${res.data[0].cat}`)
        .then((res) => {
          setCateItem(res.data);
        });
    });
  }, [location]);
useEffect(()=>{
    const responce =async()=>{
     const res=await axios.delete(`http://localhost:8000/post/${deleteId}`,{
     headers:{token: JSON.parse(localStorage.getItem("user")).token}
    });
    if(res.data){
      navigate('/')
      setIsDelete(false)
      setWarn(false)
    }
  }
  if(isDelete){
    responce();
  }
},[isDelete])


const handleDelete=(e)=>{
   setDeleteId(e)
   setWarn(true);
}

  return (
    <>
    {<div className={`${warn?'singlecon filter':'singlecon'}`} >
      <div className="singleblog">
        <div className="main">
          {singlePost?.img && (
            <img
              className="img1"
              src={require(`../../../uploads/${singlePost.img}`)}
              alt=""
            />
          )}
          <div className="user">
            {singlePost?.userImg &&(
              <img
                src={require(`../../../uploads/${singlePost.userImg}`)}
                className="userImg"
                alt=""
              />
            )}
            <span className="username">{singlePost?.username}</span>
            <div className="icon">
              <Link to={`/write?edit=${singlePost?.id}`} state={singlePost}>
                <div className="update">
                  <img src={updateicon} alt="" />
                </div>
              </Link>
              <div
                className="delete"
                onClick={() => handleDelete(singlePost?.id)}
              >
                <img src={deleteicon} alt="" />
              </div>
            </div>
          </div>
          <div className="title">{singlePost?.title}</div>
          <div className="desc">{getText(singlePost?.desc)}</div>
        </div>
        <div className="submain">
          <div className="sblogs">
            {cateItem &&
              cateItem.map((item) => (
                <div className="sblog" key={item.id}>
                  {item.img&&<img src={require(`../../../uploads/${item.img}`)} alt="" />}
                  <div className="textfont">{item.title}</div>
                  <Link className="linktext" to={`/single/${item.id}`}>
                  <button className="mybtn">Read More</button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>}
    {warn&&<Warning setIsDelete={setIsDelete} setWarn={setWarn}/>}
    </>
  );
};
export default Singleblog;
