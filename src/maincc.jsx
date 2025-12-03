import React from "react";
import Carousel from "./carousel.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function MainCC({ title, items }) {  
  return (
    <div style={{ width: "80%", margin: "1.5rem auto", backgroundColor: "#3B4CCA", padding: "1rem", border: "1px solid black",  borderRadius: "12px", boxShadow: "2px 5px 7px"}}>
      {title && <h3 style={{ textAlign: "center", marginBottom: "1.5rem", color: "white"}}>{title}</h3>}
      <Carousel items={items} />
    </div>
  );
}