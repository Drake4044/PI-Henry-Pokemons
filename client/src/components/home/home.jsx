import React, { useEffect, useState } from "react";
import "./home.css"
import { useDispatch, useSelector } from "react-redux";
import CardPokemon from "../cardPokemon/cardPokemon";
import NavBar from "../navBar/navBar";
import { getAllPokemons } from "../../redux/actions";


const Home = () => {

    const pokemons = useSelector(state => state.pokemons)
    const dispatch = useDispatch()

    const [ pkmns, setPkmns ] = useState({
        pkmns: []
    })

    useEffect(() => {
        if(pokemons.length === 40) {
            setPkmns({
                pkmns: [...pokemons]
            })
        }
    },[pokemons])


    const refresh = (e) => {
        e.preventDefault()
        dispatch(getAllPokemons())
    }

    return(
        <div>
            <NavBar setPkmns={setPkmns} />
            <button onClick={refresh} >REFRESH</button>
            <h1>Pokemons</h1>
            <div className="card">
            {/*pkmns.filterPkmns === [] ?
            pokemons ?
            pokemons.map( pkmn => (
                <CardPokemon
                id={pkmn.id}
                key={pkmn.id}
                image={pkmn.image}
                name={pkmn.name}
                types={pkmn.types}
                />
            )) 
            : <CardPokemon
            id={pokemons.id}
            key={pokemons.id}
            image={pokemons.image}
            name={pokemons.name}
            types={pokemons.types}
            /> 
            :*/ pkmns.pkmns?.map( pkmn => (
                <CardPokemon
                id={pkmn.id}
                key={pkmn.id}
                image={pkmn.image}
                name={pkmn.name}
                types={pkmn.types}
                />
            ))
            }
            </div>
        </div>
    )
}

export default Home