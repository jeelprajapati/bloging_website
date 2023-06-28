import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [blog, setBlog] = useState(null);
  const location = useLocation().search.split("=")[1];

  const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }

  useEffect(() => {
    const postitems = async () => {
      const res = await axios.get(
        `${
          location
            ? `http://localhost:8000/post/?cat=${location}`
            : "http://localhost:8000/post/"
        }`
      );
      setBlog(res.data);
    };
    postitems();
  }, [location]);
  return (
    <div className="blogs">
      {blog?.map((item) => (
        <div className="blog" key={item?.id}>
          <div className="blogImg">
            {item?.img && (
              <img src={require(`../../../uploads/${item?.img}`)} alt=""/>
            )}
          </div>
          <div className="content">
            <div className="title">{item.title}</div>
            <div className="desc">{getText(item.desc)}</div>
            <Link className="linktext" to={`/single/${item.id}`}>
              <button className="btn">Read More</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
