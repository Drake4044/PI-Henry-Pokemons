import React, { useEffect, useState } from "react";
import "./home.css"
import { useDispatch, useSelector } from "react-redux";
import CardPokemon from "../cardPokemon/cardPokemon";
import NavBar from "../navBar/navBar";
import Loader from "../loader/loader";
import { getAllPokemons } from "../../redux/actions";


const Home = () => {

    const pokemons = useSelector(state => state.pokemons)
    const dispatch = useDispatch()

    const [ pkmns, setPkmns ] = useState([])
    const [ loading , setloading ] = useState(false)

    useEffect(() => {
            setPkmns([...pokemons])
    },[pokemons])


    return(
        <div>
            <NavBar setPkmns={setPkmns} />
            
            <h1>Pokemons</h1>
            <div className="card">

            {pkmns.length === 0 ?
            <div>
                <h1>Not Pokemons</h1>
            </div>
            : loading ? 
                <Loader/>
            : pkmns ?
                pkmns.map( pkmn => (
                <CardPokemon
                id={pkmn.id}
                key={pkmn.id}
                image={pkmn.image}
                name={pkmn.name}
                types={pkmn.types}
                />))
                : <CardPokemon
                id={pokemons.id}
                key={pokemons.id}
                image={pokemons.image}
                name={pokemons.name}
                types={pokemons.types}
                />
            }
            </div>
        </div>
    )
}

export default Home