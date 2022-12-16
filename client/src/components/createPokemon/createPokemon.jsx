import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPkmn } from "../../redux/actions";


const CreatePokemons = () => {

    const [ pkmn, setPkmn ] = useState({
        name: "",
        image: "",
        hp: 0,
        attack: 0,
        speed: 0,
        defense: 0,
        height: 0,
        weight: 0,
        types: [],
    })

    const dispatch = useDispatch()

    const changeHandler = e => {
        setPkmn({
            ...pkmn,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        dispatch(createPkmn(pkmn))
    }

    return (
        <div>
            <h2>Create Your Pokemon!!!</h2>
            <form onSubmit={onSubmit} >
                <label>Name: </label>
                <input type="text" name="name" value={pkmn.name} onChange={changeHandler} />
                <label>Image: </label>
                <input type="text" name="image" value={pkmn.image} onChange={changeHandler} />
                <label>Hp: </label>
                <input type="text" name="hp" value={pkmn.hp} onChange={changeHandler} />
                <label>Attack: </label>
                <input type="text" name="attack" value={pkmn.attack} onChange={changeHandler} />
                <label>Defense: </label>
                <input type="text" name="defense" value={pkmn.defense} onChange={changeHandler} />
                <label>Speed: </label>
                <input type="text" name="speed" value={pkmn.speed} onChange={changeHandler} />
                <label>Height: </label>
                <input type="text" name="height" value={pkmn.height} onChange={changeHandler} />
                <label>Weight: </label>
                <input type="text" name="weight" value={pkmn.weight} onChange={changeHandler} />
                <label>Type/s: </label>
                <input type="text" name="types" value={pkmn.types} onChange={changeHandler} />
                <button type="submit" >Crate!!</button>
            </form>
        </div>
    )
}

export default CreatePokemons