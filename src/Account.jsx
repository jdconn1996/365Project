import React from 'react'
import './Account.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainCC from './maincc.jsx';


function Acount() {
  
  

  
  return (
    <>
      <div style={{width: "100%"}}>
        <div
          style={{width: "100%"}}
        >

            
            <div style={{marginTop: "10px"}}>
              <button className="btn btn-primary" style={{marginRight: "10px"}}>
                ❤ Favorites
              </button>
              <button className="btn btn-primary">
                History
              </button>
              
            </div>
            
        </div>
      </div>
    </>
  )
}

export default Account
