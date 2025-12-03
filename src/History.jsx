import React, { useState } from "react";
import PokedexInfo from "./PokedexInfo.jsx";
import { useStorage } from "./StorageContext.jsx";

export default function History({ fallbackItems = null }) {
    const { history = [], clearHistory, addToSaved } = useStorage();
    const [selected, setSelected] = useState(null);

    const items = (history && history.length > 0) ? history : (fallbackItems ?? []);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h3>History</h3>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={clearHistory}
                    disabled={!history || history.length === 0}
                >
                    Clear
                </button>
            </div>

            {selected ? (
                <PokedexInfo
                    pokemon={selected}
                    onSelect={(p) => { addToSaved && addToSaved(p); }}
                    onClear={() => setSelected(null)}
                />
            ) : null}

            <div className="row g-2">
                {items.length === 0 && <div className="text-muted">No history yet.</div>}
                {items.map(it => (
                    <div key={String(it.id ?? it.name)} className="col-12 col-sm-6 col-md-4">
                        <div className="card p-2 d-flex align-items-center">
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
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

