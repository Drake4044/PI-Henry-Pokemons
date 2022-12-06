import { GET_ALL_POKEMONS } from "../actions"

const initialState = {
    pokemons: [],
    types: [],
    pokemonDetail: {}
}


const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
        default: return {...state}
    }
}

export default rootReducer