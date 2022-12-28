import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPkmn, getAllTypes } from "../../redux/actions";
import Type from "../type/type";



const CreatePokemons = () => {

    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state.pokemons)
    // const pokemonsFromDb = pokemons.filter(pkmn => pkmn.hasOwnProperty("dbContent")).map(pkmn => pkmn.name)
    const pokemonsMap = pokemons.map( pkmn => pkmn.name)
    

    const between = (x, min, max) => {
        return x >= min && x <= max
    }

    const validate = (property,value,error) => {
        if (property === "name") {
            error[property] = value === "" || !value || !/^[A-Za-z]+$/.test(value) || pokemonsMap.includes(value)  ? "Name debe UNICO, solo letras sin espacios y sin numeros" : ""
        }
        if (property === "image") {
            error[property] = value == "" || !value || !/https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*/.test(value) ? "image debe ser un Url de una imagen" : ""
        }   
        if (property === "hp") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? "Hp debe numeros y el valor entre 0 y 255" : ""
        }
        if (property === "attack") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? "Attack debe numeros numeros y el valor entre 0 y 255" : ""
        }
        if (property === "defense") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? "Defense debe numeros numeros y el valor entre 0 y 255" : ""
        }
        if (property === "speed") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? "Speed debe numeros numeros y el valor entre 0 y 255" : ""
        }
        if (property === "height") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? "Height debe numeros numeros y el valor entre 0 y 255" : ""
        }
        if (property === "weight") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? "Weight debe numeros numeros y el valor entre 0 y 255" : ""
        }
        if (property === "types") {
            error[property] = pkmn[property].length === 0 || pkmn[property].length >= 2 || pkmn[property] === []|| !pkmn[property] ? "Types debe ser como min 1 y max 2 types" : ""
        }
    return error
}


    

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
        error: {}
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTypes())
    },[dispatch])

    const changeHandler = e => {
        const {name,value} = e.target
        setPkmn({
            ...pkmn,
            [name]: value,
            error: validate(name,value,pkmn.error)
        })
    }

    const typesHandler = e => {
        const {name,value} = e.target
        const find = types.find( type => type.name === value)
        if(!pkmn.types.includes(find)){
            setPkmn({
                ...pkmn,
                types: [...pkmn.types, find ],
                error: validate(name,value,pkmn.error)
            })
        }
    }

    const onSubmit = e => {
        e.preventDefault()
        const pokemonInput = {
            name: pkmn.name,
            image: pkmn.image,
            hp: pkmn.hp,
            attack: pkmn.attack,
            defense: pkmn.defense,
            speed: pkmn.speed,
            height: pkmn.height ,
            weight: pkmn.weight,
            types: pkmn.types.map( type => type.name),
        }
        if(pkmn.error.length > 6){
            dispatch(createPkmn(pokemonInput))
        } else {
            alert("tienes q completar todos los inputs")
        }
    }

    return (
        <div>
            <h2>Create Your Pokemon!!!</h2>
            <Link to="/pokemons" >
                    <button>ATRAS</button>
                </Link>
            <form onSubmit={onSubmit} >
                <label>Name: </label>
                <input type="text" name="name" value={pkmn.name} onChange={changeHandler} onBlur={e => console.log(e.target.value)}/>
                {pkmn.error.name && <p>{pkmn.error.name}</p>}
                <label>Image: </label>
                <input type="text" name="image" value={pkmn.image} onChange={changeHandler} />
                {pkmn.error.image && <p>{pkmn.error.image}</p>}
                <label>Hp: </label>
                <input type="text" name="hp" value={pkmn.hp} onChange={changeHandler} />
                {pkmn.error.hp && <p>{pkmn.error.hp}</p>}
                <label>Attack: </label>
                <input type="text" name="attack" value={pkmn.attack} onChange={changeHandler} />
                {pkmn.error.attack && <p>{pkmn.error.attack}</p>}
                <label>Defense: </label>
                <input type="text" name="defense" value={pkmn.defense} onChange={changeHandler} />
                {pkmn.error.defense && <p>{pkmn.error.defense}</p>}
                <label>Speed: </label>
                <input type="text" name="speed" value={pkmn.speed} onChange={changeHandler} />
                {pkmn.error.speed && <p>{pkmn.error.speed}</p>}
                <label>Height: </label>
                <input type="text" name="height" value={pkmn.height} onChange={changeHandler} />
                {pkmn.error.height && <p>{pkmn.error.height}</p>}
                <label>Weight: </label>
                <input type="text" name="weight" value={pkmn.weight} onChange={changeHandler} />
                {pkmn.error.weight && <p>{pkmn.error.weight}</p>}
                <label>Type/s: </label>
                <select name="types" value={pkmn.types} onChange={typesHandler} >
                    <option value="">Default</option>
                {types?.map(type => 
                        <option key={type.id} value={type.name} >{type.name}</option>
                    )}
                </select>
                {pkmn.error.types && <p>{pkmn.error.types}</p>}
                {pkmn.types?.map(type => 
                    <Type id={type.id} key={type.id} type={type.name} setPkmn={setPkmn} state={pkmn} />
                )}
                <button type="submit" >Crate!!</button>
            </form>
        </div>
    )
}

export default CreatePokemons