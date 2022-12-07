import './App.css';
import InitialPage from "./components/initialPage/initialPage.jsx";
import Home from './components/home/home';
import { Route } from "react-router-dom";
import DetailPokemon from './components/detailPokemon/detailPokemon';


function App() {
  return (
    <div className="App">
      <h1>Welcome to Pokedex</h1>
        <Route exact path="/" component={InitialPage} />
        <Route exact path="/pokemons" component={Home} />
        <Route path="/pokemons/:id" component={DetailPokemon} />
        <Route path="/create" />
    </div>
  );
}

export default App;
