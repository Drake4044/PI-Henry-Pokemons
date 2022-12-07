import axios from "axios"

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"
export const GET_DETAIL_POKEMON = "GET_DETAIL_POKEMON"
export const CLEAR_DETAIL = "CLEAR_DETAIL"
export const DELETE_POKEMON = "DELETE_POKEMON"


export const getAllPokemons = () => {
    return async dispatch => {
        const pokemons = (await
        axios("http://localhost:3001/pokemons")).data
        dispatch({
            type: GET_ALL_POKEMONS,
            payload: pokemons
        })
    }
}

export const getDetailPokemon = (id) => {
    return async dispatch => {
        const detailPkmn = (await
        axios(`http://localhost:3001/pokemons/${id}`)).data
        dispatch({
            type: GET_DETAIL_POKEMON,
            payload: detailPkmn
        })
    }
}


export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL,
        payload: {}
    }
}

export const deletePokemon = (id) => {
    return {
        type: DELETE_POKEMON,
        payload: id
    }
}