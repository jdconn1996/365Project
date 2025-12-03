import React, {useEffect, useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainCC from './maincc.jsx';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import { useStorage } from "./StorageContext.jsx";
import IconNav from "./IconNav.jsx";
import Pokedex from './Pokedex.jsx';
import Compare from './Compare.jsx';
import Battle from './Battle.jsx';
import History from './History.jsx';
import Favorites from './Favorites.jsx';
import Four from './Four.jsx';


const HomePage = ({suggestedItems, recentItems}) => {
    const navigate = useNavigate();
    const [term, setTerm] = useState("");
    const { history = [] } = useStorage();

    const recent = (history && history.length > 3) ? history : (recentItems ?? []);


  const bottomMenu = [
    { name: 'Compare', image: 'src/compare.png', link: '/compare' },
    { name: 'Battle Sim', image: 'src/battlesim.png', link: '/battle'},
  ];
  const onSearch = () => {
      if(!term) return;
      navigate(`/pokedex?query=${encodeURIComponent(term)}`);
  }
  return (

      <>
          <div className="container-fluid text-start" style={{width: "100%", height: "100%"}}>
              <div>

                  <div className="d-flex align-items-center" style={{width: "60%", margin: "1rem auto", gap: '0.5rem'}}>
                      <input
                          className="form-control"
                          placeholder="Type Pokémon name"
                          value={term}
                          onChange={(e) => setTerm(e.target.value)}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter') onSearch();
                          }}
                      />
                      <button className="btn btn-primary" onClick={onSearch}>Search</button>
                  </div>
              </div>

              <div style={{marginTop: "10px", margin: "1rem auto", width: "60%"}}>
                  <Link className="btn btn-primary" to="/favorites" style={{marginRight: "10px"}}>❤ Favorites</Link>
                  <Link className="btn btn-primary" to="/history">History</Link>
              </div>

              <MainCC title="Recently Viewed" items={recent}/>
              <MainCC title="Suggested Pokémon" items={suggestedItems}/>
              <IconNav items={bottomMenu}/>
          </div>
      </>

  )
}

async function RandomPokemon(count) {
    const items = [];
    const maxId = 1010;
    while (count < 12) {
        try {
            const randomId = Math.floor(Math.random() * maxId) + 1;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            if (!response.ok) {
                console.log("Failed to fetch Pokémon data");
                count++;
            }
            const data = await response.json();
            const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const image = data.sprites?.front_default || null;
            const id = data.id;
            items.push({name, image, id});
        } catch (error) {
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
        <Route path="/compare" element={<Compare />}/>
        <Route path="/battle" element={<Battle />}/>
        <Route path="/history" element={<History /> }/>
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/404" element={<Four />}/>
      </Routes>
  );
}


export default App;
