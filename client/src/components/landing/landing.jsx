import React from "react";
import { Link } from "react-router-dom";


const Landing = () => {
    
    return(
        <div>
            <Link to="/pokemons" >
                <h1>GO POKEMONS</h1>
            </Link>
    
            <h1>Welcome to Pokedex</h1>

            <Link to="/create" >
                <h1>CREATE POKEMON</h1>
            </Link>
        </div>
    )
}

export default Landing