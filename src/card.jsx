import React from "react";


export default function Card({ name, image, url }) {  
    return (
        <a href={url} className="p-0 d-block" style={{ display: "block" }}>
            <div className="card app-card" style={{ width: "100%", maxWidth: "320px", backgroundColor: "#FF0000" }}>
                <img className="card-img-top img-fluid" src={image} alt={name} style={{borderRadius: "12px", width: "100%", height: "auto", objectFit: "cover"}} />
                <div className="card-body text-center" style={{ textAlign: "center" }}>
                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
        </a>
    );
}