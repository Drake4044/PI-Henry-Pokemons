require('dotenv').config();
const axios = require("axios")
import { Pokemons, Types } from './src/db.js';

const createDbPokemons = async () => {
    
    const firstCall = await 
    axios("https://pokeapi.co/api/v2/pokemon")
    const secondCall = await firstCall.data.resutls
    // const finalCall = await secondCall
    // // const allPokemons = await secondCall.data.results 

    const pokemons = secondCall.map( p => ({
        name: p.name,
        url: p.url
        }
    ))

    console.log(pokemons);

    pokemons.forEach( pokemon => {
		Pokemons.create({
            name: pokemon.name,
            url: pokemon.url  
		});
	})
}

createDbPokemons()

module.exports = {
    createDbPokemons
}