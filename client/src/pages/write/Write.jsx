import React, { useState } from "react";
import "./Write.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
const Write = () => {
  const edit = useLocation().state;
  const [value, setValue] = useState(edit?.desc || "");
  const [title, settitle] = useState(edit?.title || "");
  const [cat, setCat] = useState(edit?.cat || "");
  const [file, setFile] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    if (!edit) {
      axios.post("http://localhost:8000/upload", formdata).then((res) => {
        axios
          .post(
            `http://localhost:8000/post/add`,
            {
              title,
              desc: value,
              img: res.data,
              cat,
            },
            {
              headers: {
                token: JSON.parse(localStorage.getItem("user")).token,
              },
            }
          )
          .then((res) => {
            // navigate("/");
          });
      });
    } else {
      if (file) {
        axios.post("http://localhost:8000/upload", formdata).then((res) => {
          axios
            .put(
              `http://localhost:8000/post/${edit.id}`,
              {
                title,
                desc: value,
                img: res.data,
                cat,
              },
              {
                headers: {
                  token: JSON.parse(localStorage.getItem("user")).token,
                },
              }
            )
            .then((res) => {
              console.log(res.data);
              // navigate("/");
            });
        });
      } else {
        axios
          .put(
            `http://localhost:8000/post/${edit.id}`,
            {
              title,
              desc: value,
              img: edit.img,
              cat,
            },
            {
              headers: {
                token: JSON.parse(localStorage.getItem("user")).token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            // navigate("/");
          });
      }
    }
  };
  return (
    <div className="wcon">
      <div className="editor">
        <div className="addtitle">
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
        </div>
        <div className="adddesc">
          <ReactQuill
            className="quill"
            theme="snow"
            value={value}
            onChange={setValue}
          />
          ;
        </div>
      </div>
      <div className="category">
        <div className="categoryitem">
          <div className="cattitle">Category</div>
          <div className="catitem">
            <div className="art">
              <input
                type="radio"
                onClick={() => setCat("art")}
                name="cat"
                value="art"
                checked={cat === "art"}
              />
              <label htmlFor="">ART</label>
            </div>
            <div className="cinema">
              <input
                type="radio"
                onClick={() => setCat("cinema")}
                name="cat"
                value="cinema"
                checked={cat === "cinema"}
              />
              <label htmlFor="">CINEMA</label>
            </div>
            <div className="art">
              <input
                type="radio"
                onClick={() => setCat("technology")}
                name="cat"
                value="technology"
                checked={cat === "technology"}
              />
              <label htmlFor="">TECHNOLOGY</label>
            </div>
            <div className="art">
              <input
                type="radio"
                onClick={() => setCat("science")}
                name="cat"
                value="science"
                checked={cat === "science"}
              />
              <label htmlFor="">SCIENCE</label>
            </div>
            <div className="design">
              <input
                type="radio"
                onClick={() => setCat("design")}
                name="cat"
                value="design"
                checked={cat === "design"}
              />
              <label htmlFor="">DESIGN</label>
            </div>
            <div className="food">
              <input
                type="radio"
                onClick={() => setCat("food")}
                name="cat"
                value="food"
                checked={cat === "food"}
              />
              <label htmlFor="">FOOD</label>
            </div>
          </div>
        </div>
        <div className="pstatus">
          <div className="pclass">Publish status</div>
          <span className="status">Status:Draft</span>
          <span className="visibility">Visibility:public</span>
          <div className="uploadImg">
            <label>Upload image:</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="pbtn">
            <button onClick={handleClick}>{edit?"Update":"Publish"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
