import React from "react";
import { useNavigate } from "react-router-dom";


export default function Card({ name, image, url, value }) {
    const navigate = useNavigate();
    const handleClick = (e) => {
        const q = encodeURIComponent(value ?? name ?? '')
        e.preventDefault()
        navigate(`/pokedex?query=${q}`);
    }
    if (value ?? name){
        return (
            <div role="button" onClick={handleClick} className="p-0 d-block" style={{ display: "block", textDecoration: "none", margin: "auto", cursor: "pointer" }}>
                <div className="card app-card" style={{ width: "100%", backgroundColor: "#B3A125", boxShadow: "2px 5px 7px", margin: "15px" }}>
                    <img className="card-img-top img-fluid" src={image} alt={name} style={{ borderRadius: "12px", width: "100%", height: "150px", objectFit: "cover" }} />
                    <div className="card-body text-center" style={{ textAlign: "center" }}>
                        <h5 className="card-title">{name}</h5>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <a href={url} className="p-0 d-block" style={{ display: "block", textDecoration: "none", margin: "auto" }}>
            <div className="card app-card" style={{ width: "100%", backgroundColor: "#B3A125",boxShadow: "2px 5px 7px", margin: "15px" }}>
                <img className="card-img-top img-fluid" src={image} alt={name} style={{borderRadius: "12px",  width: "100%", height: "150px", objectFit: "cover"}} />
                <div className="card-body text-center" style={{ textAlign: "center" }}>
                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
        </a>
    );
}