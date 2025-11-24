import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainCC from './maincc.jsx';


function App() {
  // Data sets (could later come from API/local storage)
  const recentItems = [
    { name: 'Pikachu', image: 'src/Pokémon_Pikachu_art.png', url: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)' },
    { name: 'Charmander', image: 'src/Pokémon_Pikachu_art.png', url: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)' },
    { name: 'Squirtle', image: 'src/Pokémon_Pikachu_art.png', url: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)' },
      { name: 'Pikachu', image: 'src/Pokémon_Pikachu_art.png', url: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)' },
      { name: 'Charmander', image: 'src/Pokémon_Pikachu_art.png', url: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)' },
      { name: 'Squirtle', image: 'src/9millyBilly.jpeg', url: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)' }
  ]; 

  const suggestedItems = [
    { name: 'Bulbasaur', image: 'src/Pokémon_Pikachu_art.png', url: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)' },
    { name: 'Eevee', image: 'src/Pokémon_Pikachu_art.png', url: 'https://bulbapedia.bulbagarden.net/wiki/Eevee_(Pok%C3%A9mon)' },
    { name: 'Snorlax', image: 'src/Pokémon_Pikachu_art.png', url: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)' }
  ];

  const bottomMenu = [
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
            <MainCC title="Recently Viewed" items={recentItems}/>
            <MainCC title="Suggested Pokémon" items={suggestedItems} />
            <MainCC title="Menu" items={bottomMenu} />
        </div>
      </div>
    </>
  )
}

export default App
