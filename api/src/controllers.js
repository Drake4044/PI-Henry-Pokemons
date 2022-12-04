const axios = require("axios")
const { Pokemon, Types } = require('./db.js') ;

const createDbTypes = async () => {
    const callTypes = (await axios("https://pokeapi.co/api/v2/type")).data.results
    
    // const mapeo = await callTypes.map( async type => await Type.findOrCreate({where: {
    //     name: type.name
    // }}))

    callTypes.forEach( async type => {
        await Types.create(type)
    });
    console.log("Database Types created");
}

createDbTypes()


const createDbPokemons = async () => {
    const fisrtCall = (await axios("https://pokeapi.co/api/v2/pokemon")).data
    const secondCall = (await axios(fisrtCall.next)).data
    const pokemons = [...fisrtCall.results, ...secondCall.results]

    const mapPokemons = await Promise.all(pokemons.map( async pokemon => {
        const pkmnInfo = (await axios(pokemon.url)).data
        const maptypes = pkmnInfo.types.map( t => t.type.name)
        const typesInfo =  await Types.findAll()
        const infoFinal = await typesInfo.map( t => ({
            id: t.id,
            name: t.name
        }))
        console.log(infoFinal)
        return {
            // id: pkmnInfo.id,
            name: pkmnInfo.name,
            image: pkmnInfo.sprites.other["official-artwork"].front_default,
            hp: pkmnInfo.stats[0].base_stat,
            attack: pkmnInfo.stats[1].base_stat,
            defense: pkmnInfo.stats[2].base_stat,
            speed: pkmnInfo.stats[5].base_stat,
            height: pkmnInfo.height,
            weight: pkmnInfo.weight,
            types: typesInfo
        }
        
    }))

    // for (let i = 0 ; i < mapPokemons.length ; i++) {
    
    //     const newPkmn = await Pokemon.create(mapPokemons[i])
    //     const relation = mapPokemons[i].types
    //     await newPkmn.addTypes(relation)
    // }

    console.log("Database pokemons created")

    mapPokemons.forEach(  async pkmn => {
        await Pokemon.create(pkmn)
    })

    // console.log(mapPokemons);
}

createDbPokemons()

module.exports = {
    createDbPokemons,
}
