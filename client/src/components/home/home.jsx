import React from "react";
import "./home.css"
import { useDispatch, useSelector } from "react-redux";
import CardPokemon from "../cardPokemon/cardPokemon";
import { getAllPokemons } from "../../redux/actions";

const Home = () => {

    const pokemons = useSelector(state => state.pokemons)

    const dispatch = useDispatch()

    const refresh = () => {
        dispatch(getAllPokemons())
    }

    return(
        <div>
            <button onClick={refresh} >REFRESH</button>
            <h1>Pokemons</h1>
            <div className="card">
                {pokemons?.map( pkmn => (
                    <CardPokemon
                    id={pkmn.id}
                    key={pkmn.id}
                    image={pkmn.image}
                    name={pkmn.name}
                    types={pkmn.types}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home