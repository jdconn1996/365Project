
 import React, {useEffect, useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainCC from './maincc.jsx';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import IconNav from "./IconNav.jsx";
import PokemonInfo from "./PokedexInfo.jsx";



export default function Battle({ items = [], onSelect }) {

  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [term2, setTerm2] = useState("");
  const bottomMenu = [
    { name: 'Compare', image: 'src/compare.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:JohtoSinnoh_BF.png' },
    { name: 'Battle Sim', image: 'src/battlesim.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:EmeraldBFLogo.png' },
    { name: 'Change Game', image: 'src/changegame.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:Pok%C3%A9mon_VG_logo.png' }
  ];
    
    const [searchResult, setSearchResult] = useState(null);
    const [searchResult2, setSearchResult2] = useState(null);
    const [fighting, setFighting] = useState(null);
    const [hp1, sethp1] = useState(null);
    const [hp2, sethp2] = useState(null);
    const [selected, setSelected] = useState(null);
    const [selected2, setSelected2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [saved, _setSaved] = useState(() => {
        try {
            const raw = localStorage.getItem('savedPokemon');
            return raw ? JSON.parse(raw) : [];
        } catch (err) {
            console.log(err);
            return [];
        }
    });

    const params = new URLSearchParams(location.search);
    
    const query = params.get('query') || '';
    const query2 = params.get('query2') || '';
    useEffect(() => {
        setTerm(query);
        setTerm2(query2);
    }, [query, query2]);
   
  
    const fetchPokemon = async (query, setSearchResult) => {
            if (!query) {
                setSearchResult(null);
                setError(null);
                return;
            }
            setLoading(true);
            setError(null);
            setSearchResult(null);
            try {
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
                if (!resp.ok){
                    if(resp.status === 404){
                        if (mounted) navigate('/404');
                        return
                    };
                };
                const data = await resp.json();
                const payload = {
                    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                    image: data.sprites?.front_default || null,
                    id: data.id,
                    types: data.types?.map(t => t.type.name) || [],
                    abilities: data.abilities?.map(a => a.ability.name) || [],
                    height: data.height,
                    weight: data.weight,
                    stats: data.stats?.map(s => ({ name: s.stat.name, value: s.base_stat })) || []
                };
                console.log(payload)
                const bst = payload.stats.reduce((statTotal, stat) =>statTotal + stat.value, 0 );
                payload.baseStatTotal = bst;
                const hp = payload.stats.find(stat => stat.name === 'hp')?.value;
                payload.hitpoints = ((hp*2)+110);
                const att = payload.stats.find(stat => stat.name === 'attack')?.value;
                payload.attack = ((att*2)+5);
                const def = payload.stats.find(stat => stat.name === 'defense')?.value;
                payload.defense = ((def*2)+5)
                const sat = payload.stats.find(stat => stat.name === 'special-attack')?.value;
                payload.specialAttack = ((sat*2)+5);
                const sdef = payload.stats.find(stat => stat.name === 'special-defense')?.value;
                payload.specialDefense = ((sdef*2)+5)
                const spd = payload.stats.find(stat => stat.name === 'speed')?.value;
                payload.speed = ((spd*2)+5)
                setSearchResult(payload);
            } catch (err) {
                console.log(err);
            }
        };
        const onSearch = () => {
            fetchPokemon(term, setSearchResult);
            if(!term) return;
            navigate(`/battle?query=${encodeURIComponent(term)}`);
            
        };
        const onSearch2 = () => {
            fetchPokemon(term2, setSearchResult2);
            if(!term2) return;
            navigate(`/battle?query2=${encodeURIComponent(term2)}`);
        };
        
        useEffect(() => {
            if (query) fetchPokemon(query, setSearchResult);
            if (query2) fetchPokemon(query2, searchResult2);
        }, [query, query2]);

        const fight = (searchResult, searchResult2) => {
            if (searchResult.attack>searchResult2.attack){
                <h1>{searchResult.name}Wins!</h1>
            }
            else if (searchResult.attack < searchResult2.attack){
                <h1>{searchResult2.name}Wins!</h1>
            }
            else if (searchResult.attack === searchResult2.attack){
                <h1>Tie!</h1>
            }
            else {
                <h1>Toss up!</h1>
            }
        };
  return (

      <>
          <div className="container-fluid text-start" style={{width: "100%", height: "100vh"}}>
              <div className="container py-3">
                <h2 className="mb-5">Battle</h2>

                    <div className="d-flex align-items-center" style={{width: "60%", margin: "1rem auto", gap: '0.5rem'}}>
                      <input
                          className="form-control"
                          placeholder="Type Pokémon 1 name"
                          value={term}
                          onChange={(e) => setTerm(e.target.value)}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter') onSearch();
                          }}
                      />
                      <button className="btn btn-primary" onClick={onSearch}>Search</button>
                    </div>
                    <div className="d-flex align-items-center" style={{width: "60%", margin: "1rem auto", gap: '0.5rem'}}>
                      <input
                          className="form-control"
                          placeholder="Type Pokémon 2 name"
                          value={term2}
                          onChange={(e) => setTerm2(e.target.value)}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter') onSearch2();
                          }}
                      />
                      <button className="btn btn-primary" onClick={onSearch2}>Search</button>
                      
                     </div>
                          {searchResult2 && searchResult &&(
                        <div className="d-flex align-items-center" style={{width: "10%", margin: "1rem auto", gap: '0.5rem'}}>
 
                            <div> 
                            
                                
                            
                                <button className="btn btn-primary" onClick={fight}>FIGHT!</button>
                                
                                
                                
                                
                            </div>
                        </div>
                    )}
            {error && <div className="alert alert-danger">{error}</div>}
                 <div className='d-flex justify-content-around mt-4'>
                    {searchResult &&(
                        <div>
                            <h4>{searchResult.name} Level 100</h4>
                            <img src={searchResult.image} alt={searchResult.name} />
                            <div> 
                            
                                
                                <h3>Hp: {searchResult.hitpoints} </h3>
                                
                                
                            </div>
                        </div>
                    )}
                    
                    {searchResult2 &&(
                        <div>
                            <h4>{searchResult2.name} Level 100</h4>
                            <img src={searchResult2.image} alt={searchResult2.name} />
                            <div> 
                            
                                
                                
                                <h3>Hp: {searchResult2.hitpoints} </h3>
                                
                                
                            </div>
                        </div>
                    )}
                    
                 </div>


              </div>
              <IconNav items={bottomMenu}/>
          </div>
      </>

  )
}