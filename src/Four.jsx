import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Four = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    


    

    return (
        <div className="container py-3">
            <h2 className="mb-3">Page NOT Found</h2>
            <p>Page you are looking for does not exist!</p>
            <Link to="/">Return Home</Link>
            <p>Professor Oaks words echo, there is a time and a place for everything, but not here!</p>

           
            
        </div>
    );
}