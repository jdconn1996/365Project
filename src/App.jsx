import React, {useEffect, useState} from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainCC from './maincc.jsx';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import IconNav from "./IconNav.jsx";
import Pokedex from './Pokedex.jsx';
import Four from './Four.jsx';

const HomePage = ({suggestedItems, recentItems}) => {



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
            <IconNav items={bottomMenu}/>
        </div>
      </div>
    </>
    
  )
}

async function RandomPokemon(count){
    const items = [];
    const maxId = 1010;
    while(count < 12){
            try{
                const randomId = Math.floor(Math.random() * maxId) + 1;
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
                if(!response.ok){
                    console.log("Failed to fetch Pokémon data");
                    count ++;
                }
                const data = await response.json();
                const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                const image = data.sprites?.front_default || null;
                const id = data.id;
                items.push({name, image, id});
            }catch(error){
                console.error("Error fetching random Pokémon:", error);
            }


        count++;
    }
    console.log(items);
    return items;
}


function App() {

    const [suggestedItems, setSuggestedItems] = useState([]);
    const [recentItems, setRecentItems] = useState([]);


    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try{
                const items = await RandomPokemon(0);
                const recent = await RandomPokemon(0);

                if (mounted) setSuggestedItems(items);
                if (mounted) setRecentItems(recent);
                console.log("Suggested Items:", items);
            }catch(error){
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
        return () => { mounted = false; };
    }, []);

  return (
      <Routes>
        <Route path="/" element={<HomePage suggestedItems={suggestedItems} recentItems={recentItems}/>}/>
        <Route path="/pokedex" element={<Pokedex items={suggestedItems}/>}/>
        <Route path="/four" element={<Four />}/>
      </Routes>
  );
}


export default App;
