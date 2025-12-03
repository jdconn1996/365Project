import React, {createContext, useContext, useEffect, useState, useCallback, useMemo} from 'react';

const StorageContext = createContext(null);

export function StorageProvider({ children }) {
    const [saved, setSaved] = useState(() => {
        try{
            const raw = localStorage.getItem('savedPokemon');
            return raw ? JSON.parse(raw) : [];
        }catch(error){
            console.log(error);
            return[];
        }
    });

    const [history, setHistory] = useState(() => {
        try{
            const raw = localStorage.getItem('historyPokemon');
            return raw ? JSON.parse(raw) : [];
        }catch(error){
            console.log(error);
            return[];
        }
    });

    useEffect(() => {
        localStorage.setItem('savedPokemon', JSON.stringify(saved));
    }, [saved]);
    useEffect(() => {
        localStorage.setItem('historyPokemon', JSON.stringify(history));
    }, [history]);

    const addToHistory = useCallback((p) => {
        if (!p) return;
        const id = String(p.id ?? p.name);
        setHistory(prev => {
            const filtered = prev.filter(item => String(item.id ?? item.name) !== id);
            return [p, ...filtered].slice(0, 50);
        });
    }, []);

    const addToSaved = useCallback((p) => {
        if (!p) return;
        setSaved(prev => (prev.some(i => String(i.id) === String(p.id)) ? prev : [...prev, p]));
    }, []);

    const removeFromSaved = useCallback((p) => {
        if (!p) return;
        setSaved(prev => prev.filter(i => String(i.id) !== String(p.id)));
    }, []);

    const clearHistory = useCallback(() => setHistory([]), []);

    const value = useMemo(() => ({
        saved,
        history,
        addToHistory,
        addToSaved,
        removeFromSaved,
        clearHistory
    }), [saved, history, addToHistory, addToSaved, removeFromSaved, clearHistory]);
    return (
        <StorageContext.Provider value={value}>
            {children}
        </StorageContext.Provider>
    );
}

export function useStorage(){
    const ctx = useContext(StorageContext);
    if (!ctx) throw new Error('useStorage must be used within a StorageProvider');
    return ctx;

};