import React from "react";


export default function Card({ name, image, url }) {  
    return (
        <a href={url} className="btn btn-primary">
            <div className="card" style={{ width: "100%" }}>
                <img className="card-img-top" src={image} alt={name}></img>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
        </a>
    );
}