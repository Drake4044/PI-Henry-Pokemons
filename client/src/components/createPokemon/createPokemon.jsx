import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPkmn, getAllTypes } from "../../redux/actions";
import Type from "../type/type";



const CreatePokemons = () => {

    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state.pokemons)
    const pokemonsMap = pokemons.map( pkmn => pkmn.name)
    

    const between = (x, min, max) => {
        return x >= min && x <= max
    }

    const validate = (property,value,error) => {
        if (property === "name") {
            value === "" || !value || !/^[A-Za-z]+$/.test(value) || pokemonsMap.includes(value)  ?  error[property] = "Name debe UNICO, solo letras sin espacios y sin numeros" : error = {}
        }
        if (property === "image") {
            value == "" || !value || !/https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*/.test(value) ? error[property] = "image debe ser un Url de una imagen" : error = {}
        }   
        if (property === "hp") {
            value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? error[property] = "Hp debe numeros y el valor entre 0 y 255" : error = {}
        }
        if (property === "attack") {
            value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? error[property] = "Attack debe ser un valor entre 0 y 255" : error = {}
        }
        if (property === "defense") {
            value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? error[property] = "Defense debe ser un valor entre 0 y 255" : error = {}
        }
        if (property === "speed") {
            value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? error[property] = "Speed debe ser un valor entre 0 y 255" : error = {} 
        }
        if (property === "height") {
            value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? error[property] = "Height debe ser un valor entre 0 y 255" : error = {}
        }
        if (property === "weight") {
            value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? error[property] = "Weight debe ser un valor entre 0 y 255" : error = {}
        }
        if (property === "types") {
            pkmn[property].length > 1 || !pkmn[property] ? error[property] = "Types debe ser como min 1 y max 2 types" : error = {}
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
        if(Object.keys(pkmn.error).length === 0){
            const imagenUrl = "https://marriland.com/wp-content/plugins/marriland-core/images/pokemon/sprites/home/full/unown-n.png"

            const pokemonInput = {
                name: pkmn.name,
                image: pkmn.image === "" ? imagenUrl : pkmn.image,
                hp: pkmn.hp,
                attack: pkmn.attack,
                defense: pkmn.defense,
                speed: pkmn.speed,
                height: pkmn.height ,
                weight: pkmn.weight,
                types: pkmn.types.map( type => type.name).join(" - ")}
            dispatch(createPkmn(pokemonInput))
        } else alert("Completatodos los campos sin errores")
    }

    return (
        <div>
            <h2>Create Your Pokemon!!!</h2>
            <form onSubmit={onSubmit} >
                <label>Name: </label>
                <input type="text" name="name" value={pkmn.name} onChange={changeHandler} onBlur={e => console.log(e.target.value)}/>
                {pkmn.error.name && <p>{pkmn.error.name}</p>}
                <label>Image: </label>
                <input type="text" name="image" value={pkmn.image} onChange={changeHandler} />
                {pkmn.error.image && <p>{pkmn.error.image}</p>}
                <label>Hp: </label>
                <input type="number" name="hp" value={pkmn.hp} onChange={changeHandler} />
                {pkmn.error.hp && <p>{pkmn.error.hp}</p>}
                <label>Attack: </label>
                <input type="number" name="attack" value={pkmn.attack} onChange={changeHandler} />
                {pkmn.error.attack && <p>{pkmn.error.attack}</p>}
                <label>Defense: </label>
                <input type="number" name="defense" value={pkmn.defense} onChange={changeHandler} />
                {pkmn.error.defense && <p>{pkmn.error.defense}</p>}
                <label>Speed: </label>
                <input type="number" name="speed" value={pkmn.speed} onChange={changeHandler} />
                {pkmn.error.speed && <p>{pkmn.error.speed}</p>}
                <label>Height: </label>
                <input type="number" name="height" value={pkmn.height} onChange={changeHandler} />
                {pkmn.error.height && <p>{pkmn.error.height}</p>}
                <label>Weight: </label>
                <input type="number" name="weight" value={pkmn.weight} onChange={changeHandler} />
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