import axios from "axios"

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"
export const GET_ALL_TYPES = "GET_ALL_TYPES"
export const GET_DETAIL_POKEMON = "GET_DETAIL_POKEMON"
export const GET_POKEMONS_BY_NAME = "GET_POKEMONS_BY_NAME"
export const CLEAR_DETAIL = "CLEAR_DETAIL"
export const GET_POKEMONS_BY_TYPE = "GET_POKEMONS_BY_TYPE"
export const DELETE_POKEMON = "DELETE_POKEMON"


export const getAllPokemons = () => {
    return async dispatch => {
        try {
            const pokemons = (await
                axios("http://localhost:3001/pokemons")).data
                dispatch({
                    type: GET_ALL_POKEMONS,
                    payload: pokemons
                })
                console.log("Pokemons Gotcha");
        } catch (error) {
            console.log(error.response.data);
        }
    }
}

export const getAllTypes = () => {
    return async dispatch => {
        try {
            const types = (await
                axios("http://localhost:3001/types")).data
                dispatch({
                    type: GET_ALL_TYPES,
                    payload: types
                })
        } catch (error) {
            console.log(error.response.data);
        }
    }
}


export const getDetailPokemon = id => {
    return async dispatch => {
        const detailPkmn = (await
        axios(`http://localhost:3001/pokemons/${id}`)).data
        dispatch({
            type: GET_DETAIL_POKEMON,
            payload: detailPkmn
        })
    }
}

export const getPokemonsByName = name => {
    return async dispatch => {
        try {
            const pkmnsByName = (await
                axios(`http://localhost:3001/pokemons?name=${name}`)).data
            dispatch({
                type: GET_POKEMONS_BY_NAME,
                payload: pkmnsByName
            })
        } catch (error) {
            console.log(error.response.data);
        }
    }
}


export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL,
        payload: {}
    }
}


export const getPokemonsByType = pokemons => {
    return {
        type: GET_POKEMONS_BY_TYPE,
        payload: pokemons
    }
}

export const deletePokemon = (id) => {
    return {
        type: DELETE_POKEMON,
        payload: id
    }
}


export const createPkmn = pkmn => {
    return async () => {
        try {
            const createPkmn = await axios.post("http://localhost:3001/pokemons", pkmn)
            alert (createPkmn.data) 
        } catch (error) {
            console.log(error.response.data);
        }
    }        
}
