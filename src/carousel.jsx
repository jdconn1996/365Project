import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Card from "./card.jsx";

export default function Carousel({ items }) {  
    return (
        <div className="container">
            <div className="row">
                {items.map((item, index) => (
                    <div key={index} className="col">
                            <Card name={item.name} image={item.image} url={item.url} />
                    </div>
                ))}
            </div>
        </div>
    );
}