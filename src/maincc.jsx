import React from "react";
import Carousel from "./carousel.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Generic container component for a titled carousel section
export default function MainCC({ title, items }) {  
  return (
    <div style={{ width: "100%", marginTop: "1.5rem" }}>
      {title && <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>{title}</h3>}
      <Carousel items={items} />
    </div>
  );
}