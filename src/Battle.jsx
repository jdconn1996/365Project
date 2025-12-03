
 import React, {useEffect, useState} from 'react'
 import './battle.css'
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
    const [hp1, sethp1] = useState(-1);
    const [hp2, sethp2] = useState(-2);
    
    const [at1, setat1] = useState(null);
    const [at2, setat2] = useState(null);
    const [de1, setde1] = useState(null);
    const [de2, setde2] = useState(null);

    const [spattack1, setspattack1] = useState(null);
    const [spattack2, setspattack2] = useState(null);
    const [spdefense1, setspdefense1] = useState(null);
    const [spdefense2, setspdefense2] = useState(null);

    
    const [spe1, setspe1] = useState(null);
    const [spe2, setspe2] = useState(null);

    const [AttackFormula1, setAttackFormula1] = useState(null);
    const [AttackFormula2, setAttackFormula2] = useState(null);
    const [AttackFormula3, setAttackFormula3] = useState(null);
    
    const [AttackFormula4, setAttackFormula4] = useState(null);

    const [firstPokemon, setfirstPokemon] = useState(null);

    
    const [whosAttacking, setwhosAttacking] = useState(null);
    
    const [greaterAttack1, setgreaterAttack1] = useState(null);
    const [greaterAttack2, setgreaterAttack2] = useState(null);
    const [winner, setWinner] = useState(null);

    const [readybutton, setReadyButton] = useState(null);
    const [settbutton, setSettButton] = useState(null);
    const [fightbutton, setFightButton] = useState(null);
    const [turnbutton, setTurnButton] = useState(null);
    

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

        const fight = () => {
            sethp1 (searchResult.hitpoints);
            sethp2 (searchResult2.hitpoints);
            setat1 (searchResult.attack);
            setat2 (searchResult2.attack);
            setde1 (searchResult.defense);
            setde2 (searchResult2.defense);
            setspattack1 (searchResult.specialAttack);
            setspattack2 (searchResult2.specialAttack);
            setspdefense1 (searchResult.specialDefense);
            setspdefense2 (searchResult2.specialDefense);
            setspe1 (searchResult.speed);
            setspe2 (searchResult2.speed);
            damageFormulaAttack1();
            damageFormulaAttack2();
            damageFormulaAttack3();
            damageFormulaAttack4();
            whosFirst();
            isgreaterAttack1();
            isgreaterAttack2();
            console.log("fighting pokemon");
            console.log("hp1 "+hp1);
            console.log("hp2 "+hp2);
            console.log("at1 "+at1);
            console.log("at2 "+at2);
            console.log("de1 "+de1);
            console.log("de2 "+de2);
            console.log("spattack1 "+spattack1);
            console.log("spattac2 "+spattack2);
            console.log("sdf1 "+spdefense1);
            console.log("sdf2 "+spdefense2);
            console.log("spe1 "+spe1);
            console.log("spe2 "+spe2);
            console.log("attack formula1 is "+AttackFormula1);
            console.log("attack formula2 is "+AttackFormula2);
            console.log("attack formula3 is "+AttackFormula3);
            
            console.log("attack formula4 is "+AttackFormula4);
            console.log("First turn goes to "+whosAttacking);
        };
        
        const decleft = () => {
            sethp1 (hp1-100);
        };
        const decright = () => {
            sethp2 (hp2-100);
        };

        const damageFormulaAttack1 = () => {
            if (at1 === null || de2 === null){
                console.log("null stats detected");
                return;
            }
           const damage = ((((((100 * 2 / 5) + 2) * 70 * at1 / 50) / de2 )  + 2)  * 90 / 100);
            setAttackFormula1(damage);
        };
        const damageFormulaAttack2 = () => {
            if (at2 === null || de1 === null){
                console.log("null stats detected");
                return;
            }
           const damage1 = ((((((100 * 2 / 5) + 2) * 70 * at2 / 50) / de1 )  + 2)  * 90 / 100);
            setAttackFormula2(damage1);
        };
        const damageFormulaAttack3 = () => {
            if (spattack1 === null || spdefense2 === null){
                console.log("null stats detected");
                return;
            }
           const damage2 = ((((((100 * 2 / 5) + 2) * 70 * spattack1 / 50) / spdefense2 )  + 2)  * 90 / 100);
            setAttackFormula3(damage2);
        };
        const damageFormulaAttack4 = () => {
            if (spattack2 === null || spdefense1 === null){
                console.log("null stats detected");
                return;
            }
           const damage3 = ((((((100 * 2 / 5) + 2) * 70 * spattack2 / 50) / spdefense1 )  + 2)  * 90 / 100);
            setAttackFormula4(damage3);
        };
        const whosFirst = () => {
            if (spe1 === null || spe2 === null){
                console.log("null speeds detected");
                return;
            }
           if (spe1 > spe2 ){
                console.log("One is faster");
                setwhosAttacking(1);
            }
            else if (spe2 > spe1 ){
                console.log("Two is faster");
                setwhosAttacking(2);
            }
            else if (spe1 === spe2){
                console.log("Same pokemon, simulator pointless")
                setwhosAttacking(1);
            }
        };
        const isgreaterAttack1 = () => {
            if (at1 > spattack1)
                {
                    setgreaterAttack1(2);
                }
            else if (spattack1 > at1)
            {
                setgreaterAttack1(3);
            }
            else if (spattack1 === at1) 
                {
                    setgreaterAttack1(2);
            } 
        }

        const isgreaterAttack2 = () => {
            if (at2 > spattack2)
                {
                    setgreaterAttack2(2);
                }
            else if (spattack2 > at2)
            {
                setgreaterAttack2(3);
            }
            else if (spattack2 === at2) 
                {
                    setgreaterAttack2(2);
            } 
        }

        const attacking = () => {
            if (hp2<1){
                setWinner(3);
            }
            if (hp1<1){
                setWinner(4);
            }
            if (whosAttacking === 1){
                if (greaterAttack1 === 2){
                    sethp2 (hp2-AttackFormula1);
                    setwhosAttacking (2);
                }
                else if (greaterAttack1 === 3){
                    sethp2 (hp2-AttackFormula3);
                    setwhosAttacking (2);
                }
            }

             if (whosAttacking === 2){
                if (greaterAttack2 === 2){
                    sethp1 (hp1-AttackFormula2);
                    setwhosAttacking (1);
                }
                else if (greaterAttack2 === 3){
                    sethp1 (hp1-AttackFormula4);
                    setwhosAttacking (1);
                }
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
                          {(winner===3) &&(
                        <div className="d-flex align-items-center" style={{width: "60%", margin: "1rem auto", gap: '0.5rem'}}>
                            <h1>{searchResult.name} IS THE WINNER!</h1>
                            <img src={searchResult.image} alt={searchResult.name} />
                            
                        </div>
                    )}
                    {(winner===4) &&(
                        <div className="d-flex align-items-center" style={{width: "60%", margin: "1rem auto", gap: '0.5rem'}}>
                            <h1>{searchResult2.name} IS THE WINNER!</h1>
                            <img src={searchResult2.image} alt={searchResult2.name} />
                            
                        </div>
                    )}
                          {searchResult2 && searchResult &&(
                        <div className="d-flex align-items-center" style={{width: "10%", margin: "1rem auto", gap: '0.5rem'}}>
 
                            <div> 
                            
                                
                            
                                <button className="btn btn-primary" onClick={fight}>FIGHT!</button>
                                <h6>please click 3 times</h6>
                                <button className="btn btn-primary" onClick={attacking}>Attack</button>
                                
                               
                                
                                
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
                            
                                
                                <h3>Hp: {hp1} </h3>
                                <div className='health-bar-container1'style={{width :`${hp1/3}%`}}>
                                    <div className='health-fill1' >

                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                    )}
                    
                    {searchResult2 &&(
                        <div>
                            <h4>{searchResult2.name} Level 100</h4>
                            <img src={searchResult2.image} alt={searchResult2.name} />
                            <div> 
                            
                                
                                
                                <h3>Hp: {hp2} </h3>
                                <div className='health-bar-container2'style={{width :`${hp2/3}%`}}>
                                    <div className='health-fill2' >

                                    </div>
                                </div>
                                
                                
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