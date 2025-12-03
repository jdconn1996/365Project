
 import React, {useEffect, useState} from 'react'
import './compare.css'
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
    { name: 'Compare', image: 'src/compare.png', link: '/compare' },
    { name: 'Battle Sim', image: 'src/battlesim.png', link: '/battle' }
  ];
    
    const [searchResult, setSearchResult] = useState(null);
    const [searchResult2, setSearchResult2] = useState(null);

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
            navigate(`/compare?query=${encodeURIComponent(term)}`);
            
        };
        const onSearch2 = () => {
            fetchPokemon(term2, setSearchResult2);
            if(!term2) return;
            navigate(`/compare?query2=${encodeURIComponent(term2)}`);
        };
        
        useEffect(() => {
            if (query) fetchPokemon(query, setSearchResult);
            if (query2) fetchPokemon(query2, searchResult2);
        }, [query, query2]);

  return (

      <>
          <div className="container-fluid text-start" style={{width: "100%", height: "100vh"}}>
              <div className="container py-3">
                <h2 className="mb-5">Compare</h2>

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
           
            {error && <div className="alert alert-danger">{error}</div>}
                 <div className='d-flex justify-content-around mt-4'>
                    {searchResult &&(
                        <div>
                            <h4>{searchResult.name}</h4>
                            <img src={searchResult.image} alt={searchResult.name} />
                            <div> 
                            
                                <h5>Stats:</h5>
                                <h6> Base Stat Total: {searchResult.baseStatTotal} </h6>
                                  <div className='bst-bar-container'style={{width :`${searchResult.baseStatTotal/3}%`}}>
                                    <div className='bst-fill' >

                                    </div>
                                </div>
                                <h5>At Level 100:</h5>

                                <h6>Hp is: {searchResult.hitpoints} </h6>
                                <div className='hp-bar-container'style={{width :`${searchResult.hitpoints/3}%`}}>
                                    <div className='hp-fill' >

                                    </div>
                                </div>
                                <h6>Attack is: {searchResult.attack}</h6>
                                <div className='at-bar-container'style={{width :`${searchResult.attack/3}%`}}>
                                    <div className='at-fill' >

                                    </div>
                                </div>
                                <h6>Defense is: {searchResult.defense}</h6>
                                <div className='df-bar-container'style={{width :`${searchResult.defense/3}%`}}>
                                    <div className='df-fill' >

                                    </div>
                                </div>
                                <h6>Special Attack is: {searchResult.specialAttack} </h6>
                                        <div className='speciala-bar-container'style={{width :`${searchResult.specialAttack/3}%`}}>
                                    <div className='speciala-fill' >

                                    </div>
                                </div>
                                <h6>Special Defense is: {searchResult.specialDefense}</h6>
                                <div className='speciald-bar-container'style={{width :`${searchResult.specialDefense/3}%`}}>
                                    <div className='speciald-fill' >

                                    </div>
                                </div>
                                <h6>Speed is: {searchResult.speed}</h6>
                                <div className='speed-bar-container'style={{width :`${searchResult.speed/3}%`}}>
                                    <div className='speed-fill' >

                                    </div>
                                </div>
                                <h6>Base Stats are:</h6>
                                
                                <ul>
                                    {searchResult.stats.map((stat)  => (
                                        <li key={stat.name}>
                                            {stat.name.charAt(0).toUpperCase()+stat.name.slice(1)}: {stat.value}
                                        </li>
                            ))} 
                                </ul>
                                
                            </div>
                        </div>
                    )}
                    {searchResult2 &&(
                        <div>
                            <h4>{searchResult2.name}</h4>
                            <img src={searchResult2.image} alt={searchResult2.name} />
                            <div> 
                            
                                <h5>Stats:</h5>
                                <h6> Base Stat Total: {searchResult2.baseStatTotal} </h6>
                                <div className='bst-bar-container'style={{width :`${searchResult2.baseStatTotal/3}%`}}>
                                    <div className='bst-fill' >

                                    </div>
                                </div>
                                <h5>At Level 100:</h5>
                                
                                <h6>Hp is: {searchResult2.hitpoints} </h6>
                                <div className='hp-bar-container'style={{width :`${searchResult2.hitpoints/3}%`}}>
                                    <div className='hp-fill' >

                                    </div>
                                </div>
                                <h6>Attack is: {searchResult2.attack}</h6>
                                <div className='at-bar-container'style={{width :`${searchResult2.attack/3}%`}}>
                                    <div className='at-fill' >

                                    </div>
                                </div>
                                <h6>Defense is: {searchResult2.defense}</h6>
                                <div className='df-bar-container'style={{width :`${searchResult2.defense/3}%`}}>
                                    <div className='df-fill' >

                                    </div>
                                </div>
                                <h6>Special Attack is: {searchResult2.specialAttack} </h6>
                                <div className='speciala-bar-container'style={{width :`${searchResult2.specialAttack/3}%`}}>
                                    <div className='speciala-fill' >

                                    </div>
                                </div>
                                <h6>Special Defense is: {searchResult2.specialDefense}</h6>
                                <div className='speciald-bar-container'style={{width :`${searchResult2.specialDefense/3}%`}}>
                                    <div className='speciald-fill' >

                                    </div>
                                </div>
                                <h6>Speed is: {searchResult2.speed}</h6>
                                <div className='speed-bar-container'style={{width :`${searchResult2.speed/3}%`}}>
                                    <div className='speed-fill' >

                                    </div>
                                </div>
                                <h6>Base Stats are:</h6>
                                
                                <ul>
                                    {searchResult2.stats.map((stat)  => (
                                        <li key={stat.name}>
                                            {stat.name.charAt(0).toUpperCase()+stat.name.slice(1)}: {stat.value}
                                        </li>
                            ))} 
                                </ul>
                                
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