import React from 'react';
import {useStorage} from './StorageContext.jsx'

export default function PokemonInfo({ pokemon, onSelect, onClear }) {
    if (!pokemon) return null;

    const {addToSaved} = useStorage();
    const { name, id, image, types = [], abilities = [], height, weight, stats = [] } = pokemon;

    const handleAdd = () => {
        addToSaved && addToSaved(pokemon);
        onSelect && onSelect(pokemon);
    }

    return (
        <div className="card mb-5 w-100" style={{margin: "auto", padding: "10px", boxShadow: "2px 5px 7px"}}>
            <div className="row g-0 align-items-center">
                <div className="col-4 text-center p-3">
                    {image ? (
                        <img src={image} alt={name} className="img-fluid" style={{ maxHeight: 220, objectFit: 'contain', minWidth: "200px" }} />
                    ) : (
                        <div className="text-muted">No image</div>
                    )}
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h4 className="card-title mb-1">
                            {name} <small className="text-muted">#{id}</small>
                        </h4>

                        <p className="mb-1"><strong>Types:</strong> {types.length ? types.join(', ') : 'Unknown'}</p>
                        <p className="mb-1"><strong>Abilities:</strong> {abilities.length ? abilities.join(', ') : 'Unknown'}</p>
                        <p className="mb-1"><strong>Height / Weight:</strong> {height ?? '-'}cm / {weight ?? '-'}cm</p>

                        {stats.length > 0 && (
                            <div className="mb-2">
                                <strong>Stats:</strong>
                                <ul className="list-unstyled mb-0">
                                    {stats.map(s => (
                                        <li key={s.name}><small>{s.name}: {s.value}</small></li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-success" onClick={handleAdd}>Add</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => onClear && onClear()}>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}