const axios = require("axios");
const { Pokemon, Types } = require('./db.js') ;


const createDbTypes = async () => {
    const callTypes = (await axios("https://pokeapi.co/api/v2/type")).data.results

    callTypes.map( async type => {
        await Types.findOrCreate({ where: { name: type.name }})
    });
    console.log("Database Types created");
}




const getPokemonsApi = async () => {
    const fisrtCall = (await axios("https://pokeapi.co/api/v2/pokemon")).data
    const secondCall = (await axios(fisrtCall.next)).data
    const pokemons = [...fisrtCall.results, ...secondCall.results]

    

    const mapPokemons = await Promise.all(pokemons.map( async pokemon => {
        const pkmnInfo = (await axios(pokemon.url)).data

        const pokemons =  {
            id: pkmnInfo.id,
            name: pkmnInfo.name,
            image: pkmnInfo.sprites.other["official-artwork"].front_default,
            hp: pkmnInfo.stats[0].base_stat,
            attack: pkmnInfo.stats[1].base_stat,
            defense: pkmnInfo.stats[2].base_stat,
            speed: pkmnInfo.stats[5].base_stat,
            height: pkmnInfo.height,
            weight: pkmnInfo.weight,
            types: pkmnInfo.types.map( t => t.type.name)
        }
        
        return pokemons
    }))
    
    return mapPokemons
}


const createDbPokemons = async () => {
    const appiInfo = await getPokemonsApi()
    // console.log(appiInfo);
        appiInfo.forEach( async pkmn => {
        const pkmcreated = await Pokemon.create(pkmn)
        const typesDB = await Types.findAll({
            where: { name: pkmn.types }
        })
        pkmcreated.addTypes(typesDB)
    })
    console.log("Database Pokemons created")
}

    const getFormatPokemons = pokemon => {
        
        const formatPk = pokemon.map( pkmn => ({
                id: pkmn.id,
                name: pkmn.name,
                image: pkmn.image,
                hp: pkmn.hp,
                attack: pkmn.attack,
                defense: pkmn.defense,
                speed: pkmn.speed,
                height: pkmn.height,
                weight: pkmn.weight,
                types: pkmn.types.map( t => t.name).join(", ")
            }))
        
        return formatPk
    }

    const getFormatPkmn = pkmn => {
        
        const formatPk = {
                id: pkmn.id,
                name: pkmn.name,
                image: pkmn.image,
                hp: pkmn.hp,
                attack: pkmn.attack,
                defense: pkmn.defense,
                speed: pkmn.speed,
                height: pkmn.height,
                weight: pkmn.weight,
                types: pkmn.types.map( t => t.name).join(", ")
            }
        
        return formatPk
    }

module.exports = {
    createDbPokemons,
    createDbTypes,
    getPokemonsApi,
    getFormatPokemons,
    getFormatPkmn
}
