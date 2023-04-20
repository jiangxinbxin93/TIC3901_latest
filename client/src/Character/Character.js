//import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Character.css";

function Character(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      //.get("http://localhost:5000/character/641b16fe4f8648c703fb7dd2")
      .get(`http://localhost:5000/character/${props.image_name}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  });
  

  return (
    <div>
      <div class="character" id="character">
        <div class="character-header">
          <div class="title">{data.name}</div>
          <button data-close-button class="close-button">
            &times;
          </button>
        </div>
        <img class="pic" style={{ width: 350 + "px" }} src={data.img} alt=""/>
        <div class="character-body">{data.desc}</div>
      </div>
      <div id="overlay"></div>
    </div>
  );
}

export default Character;
