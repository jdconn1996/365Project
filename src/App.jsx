import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <div
          style={{maxWidth: "1080px"}}
        >
          <h1>Pokédex Mobile</h1>
            <div>
              <input
                placeholder="Type Pokémon name"
              />
            </div>
            <div>
              <button>
                ❤Favorites
              </button>
              <button>
                History
              </button>
            </div>
            <h3>Recently viewed</h3>
        
            <div>
              {["Pokemon 1", "Pokemon 2", "Pokemon 3", "Pokemon 4"].map((name, pokemon) => (
              <div key={pokemon}>
                <div
                    style={{ width: 50, height: 20 }}
                ></div>
                <text>{name}</text>
              </div>
              ))}
            </div>
            <h4>Suggested Pokémon</h4>
            <div>
              {["Pokemon 1", "Pokemon 2", "Pokemon 3", "Pokemon 4"].map((name, pokemon) => (
              <div key={pokemon}>
                <div
                  style={{ height: 20 }}
                ></div>
                <text>{name}</text>
              </div>
              ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default App
