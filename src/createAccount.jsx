import React from 'react'
import './createAccount.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainCC from './maincc.jsx';


function createAccount() {
  
  

  const bottomMenu = [
    { name: 'Home', image: 'src/compare.png', url: 'https://archives.bulbagarden.net/media/upload/e/e0/Pok%C3%A9mon_Center_RSE.png' },
    { name: 'Compare', image: 'src/compare.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:JohtoSinnoh_BF.png' },
    { name: 'Battle Sim', image: 'src/battlesim.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:EmeraldBFLogo.png' },
    { name: 'Change Game', image: 'src/changegame.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:Pok%C3%A9mon_VG_logo.png' }
  ];
  return (
    <>
      <div style={{width: "100%"}}>
        <div
          style={{width: "100%"}}
        >

            <div>
              <button className="btn btn-primary">
                Create Account!
              </button>
              <input className={"form-control"} style={{width: "60%", margin: "1rem auto"}}
                placeholder="Type Pokémon name"
              />
            </div>
            <div style={{marginTop: "10px"}}>
              <button className="btn btn-primary" style={{marginRight: "10px"}}>
                ❤ Favorites
              </button>
              <button className="btn btn-primary">
                History
              </button>
              
            </div>
            <MainCC title="Menu" items={bottomMenu} />
        </div>
      </div>
    </>
  )
}

export default createAccount
