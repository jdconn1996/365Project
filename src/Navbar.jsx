import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg text-start" style={{backgroundColor: "#882121", marginBottom: "3%"}}>
                <div className="container-fluid">
                    <Link className="navbar-brand mb-0 h1" to="/" style={{color: "white"}}>PokeDex Lite</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>0
                    </button>
                    <div className="collapse navbar-collapse" id="mainNavbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" style={{color: "white"}}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pokedex" style={{color: "white"}}>Pokedex</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/compare">Compare</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/battle">Battle</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}