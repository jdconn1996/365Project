import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Navbar() {
    return (
        <>
            <nav className="navbar" style={{backgroundColor: "#CC0000", marginBottom: "3%"}}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">PokeDex Lite</span>
                </div>
            </nav>
        </>
    )
}