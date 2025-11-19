import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div class="container py-4" style={{ width: '1000px', height: '1000px', backgroundColor: 'silver' }}>
      <button type="button" class="btn btn-primary btn-lg btn-block">Search</button>

    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  
  <div class="carousel-inner">
    <div class="carousel-item active">
     <div className="cards-wrapper">
      <a href="https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)" class="btn btn-primary">
            
            <div className="card" >
           <img  src="src/Pokémon_Pikachu_art.png" alt="Card image cap"></img>
           <div class="card-body">
           <h5 class="card-title">Pikachu</h5>
           </div>
            </div>
            </a>
     </div>
    </div>
    <div class="carousel-item">
      <div className="cards-wrapper">
        <a href="https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)" class="btn btn-primary">
            
            <div className="card" >
           <img  src="src/Pokémon_Pikachu_art.png" alt="Card image cap"></img>
           <div class="card-body">
           <h5 class="card-title">Pikachu</h5>
           </div>
            </div>
            </a>
      </div>
    </div>
    <div class="carousel-item">
      <div className="cards-wrapper">
        <a href="https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)" class="btn btn-primary">
            
            <div className="card" >
           <img src="src/Pokémon_Pikachu_art.png" alt="Card image cap"></img>
           <div class="card-body">
           <h5 class="card-title">Pikachu</h5>
           </div>
            </div>
            </a>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>
</div>
      )
}

export default App
