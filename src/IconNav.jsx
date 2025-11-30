
import React from "react";
import './iconNav.css';

export default function IconNav({ items = [] }) {
    return (
        <nav className="icon-nav" aria-label="icon navigation">
            {items.map(item => (
                    <div className="icon-item" key={item.id}>
                        <div className="icon-image-wrapper">
                            <img src={item.image} alt={item.name} className="icon-image" />
                        </div>
                        <div className="icon-label">{item.name}</div>
                    </div>
            ))}
        </nav>
    );
}
