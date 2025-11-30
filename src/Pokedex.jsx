import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Pokedex({ items = [], onSelect }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';

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
                if (!resp.ok) throw new Error('Pokémon not found');
                const data = await resp.json();
                const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                const image = data.sprites?.front_default || null;
                const id = data.id;
                const types = data.types?.map(t => t.type.name) || [];
                const payload = { name, image, id, types };
                if (mounted) setSearchResult(payload);
            } catch (err) {
                if (mounted) setError(err.message || 'Error fetching Pokémon');
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchPokemon();
        return () => { mounted = false; };
    }, [query]);

    const handleSelect = (item) => {
        if (onSelect) onSelect(item);
        // optionally navigate to detail: navigate(`/pokemon/${item.id}`);
    };

    return (
        <div className="container py-3">
            <h2 className="mb-3">Pokedex</h2>

            {loading && <div className="alert alert-info">Searching...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {searchResult && (
                <div className="card mb-3" style={{ maxWidth: 480 }}>
                    <div className="row g-0 align-items-center">
                        <div className="col-4 text-center p-2">
                            {searchResult.image ? (
                                <img src={searchResult.image} alt={searchResult.name} className="img-fluid" />
                            ) : (
                                <div className="text-muted">No image</div>
                            )}
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title mb-1">{searchResult.name} <small className="text-muted">#{searchResult.id}</small></h5>
                                <p className="card-text mb-2">
                                    {searchResult.types && searchResult.types.length > 0 ? searchResult.types.join(", ") : "Type unknown"}
                                </p>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-success" onClick={() => handleSelect(searchResult)}>Add / Select</button>
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate('/pokedex')}>Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row">
                {items && items.length > 0 ? (
                    items.map((it) => (
                        <div className="col-6 col-sm-4 col-md-3 mb-3" key={it.id}>
                            <div className="card h-100">
                                <div className="text-center p-3">
                                    {it.image ? (
                                        <img src={it.image} alt={it.name} style={{ height: 96 }} />
                                    ) : (
                                        <div style={{ height: 96 }} className="d-flex align-items-center justify-content-center text-muted">
                                            No image
                                        </div>
                                    )}
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title mb-1">{it.name}</h6>
                                    <p className="card-text mb-2"><small className="text-muted">#{it.id}</small></p>
                                    <div className="d-flex justify-content-center gap-2">
                                        <button className="btn btn-sm btn-primary" onClick={() => handleSelect(it)}>
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
        </div>
    );
}