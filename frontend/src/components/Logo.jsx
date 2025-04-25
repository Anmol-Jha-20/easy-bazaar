import React from "react";
import img from "../assets/newlogo.png";

function Logo() {
  return (
    <div>
      <img src={img} alt="Logo image" style={{ width: "100px" }} />
    </div>
  );
}

export default Logo;
