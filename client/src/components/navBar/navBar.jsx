import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemonsByName, getAllPokemons  } from "../../redux/actions";


const NavBar = ({ setPkmns }) => {

    const [ pkmnName, setPkmnName ] = useState({ name: "" })
    const [ filter, setFilter ] = useState({ 
        typeFilter: "all",
        nameFilter: "default",
        attackFilter: "default",
        filterpkmns: []
    })

    const pokemons = useSelector(state => state.pokemons)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPokemons())
    },[dispatch])

    useEffect(() => {
        setFilter({ 
            ...filter,
            filterpkmns: [...pokemons] })
    },[pokemons])

    const handleChange = (e) => {
        setPkmnName({
            name: e.target.value
        })
    }

    const search = () => {
        dispatch(getPokemonsByName(pkmnName.name.toLowerCase()))
    }

    const filterTypes = (type, name, attack) => {
        let allpokemons = [...pokemons]
        if(type !== 'all') {
            allpokemons = allpokemons.filter( pk => pk.types.includes(type))
        }
        switch (name) {
            case "asc":
                allpokemons = allpokemons.sort((a, b) => a.name.localeCompare(b.name))
                break;
            case "des":
                allpokemons = allpokemons.sort((a, b) => a.name.localeCompare(b.name)).reverse()
                break;
            default:
                break;
        }
        switch(attack){
            case "max":
            allpokemons = allpokemons.sort((a, b) => a.attack - b.attack).reverse()
            break
            case "min":
            allpokemons = allpokemons.sort((a, b) => a.attack - b.attack)
            break
            default:
            break
        }
        return allpokemons
    }

    const handleFilterTypes = e => {
        const type = e.target.value
        setFilter({
            ...filter,
            typeFilter: type,
            filterpkmns: filterTypes(type, filter.nameFilter, filter.attackFilter)
        })
        
    }

    const handleFilterNames = e => {
        const name = e.target.value
        setFilter({
            ...filter,
            nameFilter: name,
            filterpkmns: filterTypes(filter.typeFilter, name, filter.attackFilter)
        })
        
    }

    const handleFilterAttack = e => {
        const attack = e.target.value
        setFilter({
            ...filter,
            attackFilter: attack,
            filterpkmns: filterTypes(filter.typeFilter, filter.nameFilter, attack)
        })
        
    }
        
    const filterButton = () => {
        setPkmns(filter.filterpkmns)
    }

    const refresh = (e) => {
        e.preventDefault()
        dispatch(getAllPokemons())
    }



    return(
        <div>
            <input type="text" name="name" placeholder="Search Pokemon..." value={pkmnName.name} onChange={handleChange} />
            <button onClick={search} >BUSCAR</button>
            <button onClick={refresh} >REFRESH</button>
            <label>Type: </label>
            <select
                name="fiter-types"
                className="filterTypes"
                onChange={handleFilterTypes}
            >
                <option value="all">All Types</option>
                <option value="normal">Normal</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="poison">Poison</option>
                <option value="bug">Bug</option>
                <option value="flying">Flying</option>
                <option value="electric">Electric</option>
                <option value="ground">Ground</option>
                <option value="fairy">Fairy</option>
            </select>
            <label>ABC: </label>
            <select
                name= "filer-name"
                className="filterNames"
                onChange={handleFilterNames}
            >
                <option value="default">default</option>
                <option value="asc">Asc.</option>
                <option value="des">Des.</option>
            </select>
            <label>Attack: </label>
            <select
                name= "filer-attack"
                className="filterAttack"
                onChange={handleFilterAttack}
            >
                <option value="default">default</option>
                <option value="max">Max</option>
                <option value="min">Min</option>
            </select>
            <button onClick={filterButton} >FILTER</button>
            <Link to="/create" >
                <button>CREATE POKEMON</button>
            </Link>
        </div>
    )
}

export default NavBar