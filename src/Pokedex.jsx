import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import IconNav from "./IconNav.jsx";
import PokemonInfo from "./PokedexInfo.jsx";

export default function Pokedex({ items = [], onSelect }) {
    const bottomMenu = [
        { name: 'Compare', image: 'src/compare.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:JohtoSinnoh_BF.png' },
        { name: 'Battle Sim', image: 'src/battlesim.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:EmeraldBFLogo.png' },
        { name: 'Change Game', image: 'src/changegame.png', url: 'https://bulbapedia.bulbagarden.net/wiki/File:Pok%C3%A9mon_VG_logo.png' }
    ];
    const location = useLocation();
    const navigate = useNavigate();
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


    useEffect(() => {
        localStorage.setItem('savedPokemon', JSON.stringify(saved));
    }, [saved]);
    useEffect(() => {

        let mounted = true;
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
                if (mounted) setSearchResult(payload);
            } catch (err) {
                if (mounted) setError(err.message || 'Error fetching Pokémon');
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchPokemon();
        return () => { mounted = false; };
    }, [query, navigate]);

    const handleSelect = (pOrEvent) => {
        // DOM event path (if someone used dataset)
        if (pOrEvent && pOrEvent.currentTarget) {
            const id = pOrEvent.currentTarget.dataset.value;
            const found = items.find(i => String(i.id) === String(id));
            if (found) setSelected(found);
            if (onSelect) onSelect(found ?? id);
            return;
        }

        // object path: full item passed directly
        if (pOrEvent && typeof pOrEvent === 'object' && 'id' in pOrEvent) {
            setSelected(pOrEvent);
            if (onSelect) onSelect(pOrEvent);
            return;
        }
    };

    const clearInfo = () => {
        if (selected) {
            setSelected(null);
            return;
        }
        navigate('/pokedex');
    };
    console.log(activeSelect);
    return (
        <div className="container py-3">
            <h2 className="mb-5">Pokedex</h2>

            {loading && <div className="alert alert-info">Searching...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {(searchResult || selected) ? (
                <PokemonInfo pokemon={searchResult ?? selected} onSelect={handleSelect} onClear={clearInfo} />
                ) : null
            }


            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-3" style={{ marginBottom: 80, backgroundColor: "#3B4CCA", justifyContent: "center", borderRadius: "12px", padding: "15px", boxShadow: "2px 5px 7px" }}>
                {items && items.length > 0 ? (
                    items.map((it) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={it.id}>
                            <div className="card h-100" style={{minHeight: 260, minWidth: 200, boxShadow: "2px 5px 7px"}}>
                                <div className="text-center p-3">
                                    {it.image ? (
                                        <img src={it.image} alt={it.name} className="img-fluid" style={{ maxHeight: 200, objectFit: 'contain' }} />
                                    ) : (
                                        <div style={{ height: 200 }} className="d-flex align-items-center justify-content-center text-muted">
                                            No image
                                        </div>
                                    )}
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title mb-1">{it.name}</h6>
                                    <p className="card-text mb-2"><small className="text-muted">#{it.id}</small></p>
                                    <div className="d-flex justify-content-center gap-2">
                                        <button className="btn btn-sm btn-primary" data-value={it.id} onClick={() => handleSelect(it)}>
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-muted">No Pokémon to show.</p>
                    </div>
                )}
            </div>
            <IconNav items={bottomMenu}/>
        </div>
    );
}