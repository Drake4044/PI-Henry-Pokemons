import React from "react";
import "./cardPokemon.css"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePokemon } from "../../redux/actions"

const CardPokemon = ({ id, image, name, types }) => {

    const dispatch = useDispatch()

    const onclick = () => {
        dispatch(deletePokemon(id))
    }

    return (
        <div className="card-pokemon">
            <button onClick={onclick} >X</button>
            <Link to={`/pokemons/${id}`} >
                <img src={image} alt="pokemon" />
                <h1>{name}</h1>
                <h3>{types}</h3>
            </Link>
        </div>
    )
}

export default CardPokemon