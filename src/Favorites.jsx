import React, { useState } from 'react';
import PokedexInfo from './PokedexInfo.jsx';
import { useStorage } from './StorageContext.jsx';

export default function Favorites({ fallbackItems = null }) {
    const { saved = [], removeFromSaved } = useStorage();
    const [selected, setSelected] = useState(null);

    const items = (saved && saved.length > 0) ? saved : (fallbackItems ?? []);

    return (
        <div style={{height: '100vh', width: '80%', margin: 'auto', textAlign: 'center'}}>
            <div className="d-flex justify-content-between align-items-center mb-2" style={{backgroundColor: "#3B4CCA", padding: '10px', borderRadius: '12px', boxShadow: "2px 5px 7px black"}}>
                <h3 style={{color: 'white'}}>Favorites</h3>
            </div>

            {selected ? (
                <PokedexInfo
                    pokemon={selected}
                    onSelect={() => {}}
                    onClear={() => setSelected(null)}
                />
            ) : null}

            <div className="row g-2">
                {items.length === 0 && <div className="text-muted">No favorites yet.</div>}
                {items.map(it => (
                    <div key={String(it.id ?? it.name)} className="col-12 col-sm-6 col-md-4" style={{backgroundColor: '#3B4CCA', width: '100%', padding: '10px', margin: 'auto', marginTop: '30px', borderRadius: '12px', boxShadow: "2px 5px 7px black"}}>
                        <div className="card p-2 d-flex align-items-center" style={{width:'80%', margin: 'auto' }}>
                            <div className="d-flex align-items-center w-100">
                                {it.image ? (
                                    <img src={it.image} alt={it.name} style={{ width: 48, height: 48, objectFit: 'contain', marginRight: 8 }} />
                                ) : (
                                    <div style={{ width: 48, height: 48, marginRight: 8 }} className="text-muted d-flex align-items-center justify-content-center">No image</div>
                                )}
                                <div style={{ flex: 1 }}>
                                    <div>{it.name} <small className="text-muted">#{it.id}</small></div>
                                </div>
                                <div className="d-flex gap-1">
                                    <button className="btn btn-sm btn-primary" onClick={() => setSelected(it)}>View</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => removeFromSaved && removeFromSaved(it)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
