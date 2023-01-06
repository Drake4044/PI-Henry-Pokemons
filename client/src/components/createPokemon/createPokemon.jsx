import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createPokemon.css"
import { Link } from "react-router-dom";
import { createPkmn, getAllTypes } from "../../redux/actions";
import Type from "../type/type";
import Landing from "../landing/landing"



const CreatePokemons = () => {  

    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state.pokemons)
    const pokemonsMap = pokemons.map( pkmn => pkmn.name)
    

    const between = (x, min, max) => {
        return x >= min && x <= max
    }

    const validate = (property,value,error) => {
        if (property === "name") {
            error[property] = value === "" || !value || !/^[A-Za-z]+$/.test(value) || pokemonsMap.includes(value)  ?  "Name debe UNICO, sin espacios y sin numeros" : ""
        }
        if (property === "image") {
            error[property] = !value || !/https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*/.test(value) ? "image debe ser un Url de una imagen" : ""
        }   
        if (property === "hp") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ?  "Hp debe numeros y el valor entre 0 y 255" : ""
        }
        if (property === "attack") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ?  "Attack debe ser un valor entre 0 y 255" : ""
        }
        if (property === "defense") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ?  "Defense debe ser un valor entre 0 y 255" : ""
        }
        if (property === "speed") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? "Speed debe ser un valor entre 0 y 255" : "" 
        }
        if (property === "height") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? "Height debe ser un valor entre 0 y 255" : ""
        }
        if (property === "weight") {
            error[property] = value === "" || !value || !parseInt(value) || !between(value, 0, 255) ? "Weight debe ser un valor entre 0 y 255" : ""
        }
        if (property === "types") {
            error[property] = pkmn[property].length > 1 || !pkmn[property] ?  "Types debe ser como min 1 y max 2 types" : ""
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
        if(Object.keys(pkmn.error).length > 0 ){

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
                types: pkmn.types.map( type => type.name)
            }
            dispatch(createPkmn(pokemonInput))
        } else alert("Debes completar al menos 1 campo")
    }

    return (
        <div className="background">
            <Landing/>
            <div className="title">
                <h2>Create Your Pokemon!!!</h2>
            </div>
            <div className="container" >
            <form className="form" onSubmit={onSubmit} >
                <div className="box">
                    <label>Name: </label>
                    <input type="text" name="name" value={pkmn.name} onChange={changeHandler}/>
                    {pkmn.error.name && <p className="error" >{pkmn.error.name}</p>}
                    <label>Image: </label>
                    <input type="text" name="image" value={pkmn.image} onChange={changeHandler} />
                    {pkmn.error.image && <p className="error" >{pkmn.error.image}</p>}
                    <label>Hp: </label>
                    <input type="number" name="hp" value={pkmn.hp} onChange={changeHandler} />
                    {pkmn.error.hp && <p className="error" >{pkmn.error.hp}</p>}
                </div>
                <div className="box">
                    <label>Attack: </label>
                    <input type="number" name="attack" value={pkmn.attack} onChange={changeHandler} />
                    {pkmn.error.attack && <p className="error" >{pkmn.error.attack}</p>}
                    <label>Defense: </label>
                    <input type="number" name="defense" value={pkmn.defense} onChange={changeHandler} />
                    {pkmn.error.defense && <p className="error" >{pkmn.error.defense}</p>}
                    <label>Speed: </label>
                    <input type="number" name="speed" value={pkmn.speed} onChange={changeHandler} />
                    {pkmn.error.speed && <p className="error" >{pkmn.error.speed}</p>}
                </div>
                <div className="box">
                    <label>Height: </label>
                    <input type="number" name="height" value={pkmn.height} onChange={changeHandler} />
                    {pkmn.error.height && <p className="error" >{pkmn.error.height}</p>}
                    <label>Weight: </label>
                    <input type="number" name="weight" value={pkmn.weight} onChange={changeHandler} />
                    {pkmn.error.weight && <p className="error" >{pkmn.error.weight}</p>}
                    <label>Type/s: </label>
                    <select name="types" className="select" value={pkmn.types} onChange={typesHandler} >
                        <option value="">Default</option>
                    {types?.map(type => 
                            <option key={type.id} value={type.name} >{type.name}</option>
                        )}
                    </select>
                    <div className="typesBox">
                        {pkmn.types?.map(type => 
                        <Type id={type.id} key={type.id} type={type.name} setPkmn={setPkmn} state={pkmn} />
                        )}
                    </div>
                    {pkmn.error.types && <p>{pkmn.error.types}</p>}
                </div>
                
                <button type="submit" className="create" >Crate!!</button>
            </form>
            </div>
        </div>
    )
}

export default CreatePokemons