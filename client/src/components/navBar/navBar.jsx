import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsByName } from "../../redux/actions";




const NavBar = (props) => {

    const [ pkmnName, setPkmnName ] = useState({ name: "" })
    const [ filter, setFilter ] = useState({ 
        nameFilter: "default",
        allPokemons: []
    })

    const pokemons = useSelector(state => state.pokemons)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getAllPokemons())
    // },[dispatch])

    useEffect(() => {
        setFilter({ 
            allPokemons: [...pokemons] })
    },[pokemons])

    const handleChange = (e) => {
        setPkmnName({
            name: e.target.value
        })
    }

    const search = () => {
        dispatch(getPokemonsByName(pkmnName.name.toLowerCase()))
    }

    const filterTypes = type => {
            let allpokemons = [...pokemons]
            if(type !== 'all') {
                allpokemons = allpokemons.filter( pk => pk.types.includes(type))
                return allpokemons
            }
            return allpokemons
    }

    const handleFilterTypes = e => {
        const value = e.target.value
        setFilter({
            ...filter,
            nameFilter: value,
            allPokemons: filterTypes(value)
        })
        
    }
        
    const filterButton = () => {
        props.setPkmns({
            pkmns: filter.allPokemons
        })
    }



    return(
        <div>
            <input type="text" name="name" placeholder="Search Pokemon..." value={pkmnName.name} onChange={handleChange} />
            <button onClick={search} >BUSCAR</button>
            <select
                name="fiter types"
                className="filterTypes"
                onChange={handleFilterTypes}
            >
                <option value="all" >All Types</option>
                <option value="normal" >Normal</option>
                <option value="fire" >Fire</option>
                <option value="water" >Water</option>
                <option value="grass" >Grass</option>
                <option value="poison" >Poison</option>
                <option value="bug" >Bug</option>
                <option value="flying" >Flying</option>
                <option value="electric" >Electric</option>
                <option value="ground" >Ground</option>
                <option value="fairy" >Fairy</option>
            </select>
            <button onClick={filterButton} >FILTER</button>
        </div>
    )
}

export default NavBar