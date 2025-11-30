
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NavBar from './NavBar.jsx'
import {BrowserRouter as Router} from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <>
        <Router>
            <NavBar />
            <App />
        </Router>
    </>
)
