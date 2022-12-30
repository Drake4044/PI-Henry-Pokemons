import React from "react";
import "./landing.css";
import Logo from "../../images/pokemon-logo.png"
import { Link } from "react-router-dom";


const Landing = () => {
    
    return(
        <div className="landing">
            <Link to="/pokemons" >
                <img src={Logo} alt="Logo Pokemon" />
            </Link>
        
            <h1>Welcome to Pokedex</h1>

            <Link to="/create" >
                <h1>CREATE POKEMON</h1>
            </Link>
        </div>
    )
}

export default Landing