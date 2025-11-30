import React from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainCC from './maincc.jsx';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';

import HomePage from './HomePage.jsx';



function App() {
  
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}>
        </Route>
        
        
      </Routes>
    </Router>
  );
}

export default App
