import { 
    GET_ALL_POKEMONS,
    GET_ALL_TYPES,
    GET_DETAIL_POKEMON,
    GET_POKEMONS_BY_NAME,
    CLEAR_DETAIL,
    GET_POKEMONS_BY_TYPE,
    DELETE_POKEMON 
} from "../actions"

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
        case GET_ALL_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case GET_DETAIL_POKEMON:
            return {
                ...state,
                pokemonDetail: action.payload   
            }
        case GET_POKEMONS_BY_NAME: 
            return {
                ...state,
                pokemons: [action.payload]
            }
        case CLEAR_DETAIL: 
            return {
                ...state,
                pokemonDetail : action.payload
            }
        case GET_POKEMONS_BY_TYPE:
            return {
                ...state,
                pokemons: action.payload
            }

        case DELETE_POKEMON:
            return {
                ...state,
                pokemons: state.pokemons.filter( pkmn => pkmn.id !== action.payload)
            }

        default: return {...state}
    }
}

export default rootReducer