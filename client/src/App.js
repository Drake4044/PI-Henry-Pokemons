import './App.css';
import { Route } from "react-router-dom";
import InitialPage from "./components/initialPage/initialPage.jsx";
import Home from './components/home/home';
import DetailPokemon from './components/detailPokemon/detailPokemon';
import CreatePokemons from './components/createPokemon/createPokemon';
import Landing from './components/landing/landing';






function App() {

  return (
    <div className="App">
        <Landing/>
        <Route exact path="/" component={InitialPage} />
        <Route exact path="/pokemons" component={Home} />
        <Route path="/pokemons/:id" component={DetailPokemon} />
        <Route path="/create" component={CreatePokemons} />
    </div>
  );
}

export default App;
