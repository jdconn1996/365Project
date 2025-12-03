
import React from "react";
import './iconNav.css';
import {Link} from "react-router-dom";

export default function IconNav({ items = [] }) {
    return (
        <nav className="icon-nav" aria-label="icon navigation">
            {items.map(item => (
                    <div className="icon-item" key={item.id}>
                        <div className="icon-image-wrapper">
                            <img src={item.image} alt={item.name} className="icon-image" />
                        </div>
                        <Link className="icon-label" to={item.link} style={{textDecoration: "none", color: "black"}}>{item.name}</Link>
                    </div>
            ))}
        </nav>
    );
}
