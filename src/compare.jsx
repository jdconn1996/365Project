
 import React, {useEffect, useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainCC from './maincc.jsx';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import IconNav from "./IconNav.jsx";
import PokemonInfo from "./PokedexInfo.jsx";



export default function Compare({ items = [], onSelect }) {

  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [term2, setTerm2] = useState("");
  const bottomMenu = [
    { name: 'Compare', image: 'src/compare.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:JohtoSinnoh_BF.png' },
    { name: 'Battle Sim', image: 'src/battlesim.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:EmeraldBFLogo.png' },
    { name: 'Change Game', image: 'src/changegame.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:Pok%C3%A9mon_VG_logo.png' }
  ];
    
    const [searchResult, setSearchResult] = useState(null);
    const [selected, setSelected] = useState(null);
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


   
  const onSearch = () => {
    const fetchPokemon = async () => {
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
                setSearchResult(payload);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPokemon();
      if(!term) return;
      navigate(`/compare?query=${encodeURIComponent(term)}`);
  }
  return (

      <>
          <div className="container-fluid text-start" style={{width: "100%", height: "100vh"}}>
              <div>
<h1>Compare Two Pokemon </h1>

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
                              if (e.key === 'Enter') onSearch();
                          }}
                      />
                      <button className="btn btn-primary" onClick={onSearch}>Search</button>
                  </div>

                 
              </div>
              <IconNav items={bottomMenu}/>
          </div>
      </>

  )
}