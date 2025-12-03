
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NavBar from './NavBar.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import { StorageProvider } from './StorageContext.jsx'

createRoot(document.getElementById('root')).render(
    <>
        <StorageProvider>
            <Router>
                <NavBar />
                <App />
            </Router>
        </StorageProvider>
    </>
)
