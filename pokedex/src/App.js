import './App.css';
import Display from './components/Display';
import PokemonCard from './components/PokemonCard';

function App() {
  return (
    <PokemonCard name="Pikachu" cover="https://www.pokepedia.fr/images/thumb/7/76/Pikachu-DEPS.png/250px-Pikachu-DEPS.png" type="Electrique" id="#025" generation="1"/>
  );
}

export default App;
