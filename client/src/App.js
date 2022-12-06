import './App.css';
import InitialPage from "./components/initialPage/initialPage.jsx";
import { Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={InitialPage} />
      <Route path="/pokemons" />
      <Route path="/pokemons/:id" />
      <Route path="/create" />
    </div>
  );
}

export default App;
