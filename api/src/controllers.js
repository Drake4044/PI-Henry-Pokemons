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
    const secondCall = (await axios(fisrtCall.next)).data.results
    const pokemons = [...fisrtCall.results, ...secondCall]

    const mapPokemons = await Promise.all(pokemons.map( async pokemon => {
        const pkmnInfo = (await axios(pokemon.url)).data

        return {
            id: pkmnInfo.id,
            name: pkmnInfo.name,
            image: pkmnInfo.sprites.other["official-artwork"].front_default,
            hp: pkmnInfo.stats[0].base_stat,
            attack: pkmnInfo.stats[1].base_stat,
            defense: pkmnInfo.stats[2].base_stat,
            speed: pkmnInfo.stats[5].base_stat,
            height: pkmnInfo.height,
            weight: pkmnInfo.weight,
            types: pkmnInfo.types.map( t => t.type.name).join(" - ")
        }
    }))
    
    return mapPokemons
}


const getInfoDB = async () => {
    const allPokemonsdb = await Pokemon.findAll({
        include: {
            model: Types,
            attributes: ["name"],
            through : {
                attributes: []
            }
        },
    })
    const formatPk = allPokemonsdb.map( pkmn => ({
        id: pkmn.id,
        name: pkmn.name,
        image: pkmn.image,
        hp: pkmn.hp,
        attack: pkmn.attack,
        defense: pkmn.defense,
        speed: pkmn.speed,
        height: pkmn.height,
        weight: pkmn.weight,
        types: pkmn.types.map( t => t.name).join(", "),
        dbContent: pkmn.dbContent
    }))
    return formatPk
}


const getAllPokemons = async () => {
    try {
        const apiPokemons = await getPokemonsApi()
        const dbPokemons = await getInfoDB()
        const allPokemons = [...apiPokemons, ...dbPokemons]
        return allPokemons
    } catch (error) {
        console.log(error);
    }
    
}




const getPokemonbyName =  async (name) => {
    const pkmnName =(await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)).data

    const formatPk = {
        id: pkmnName.id,
        name: pkmnName.name,
        image: pkmnName.sprites.other["official-artwork"].front_default,
        hp: pkmnName.stats[0].base_stat,
        attack: pkmnName.stats[1].base_stat,
        defense: pkmnName.stats[2].base_stat,  
        speed: pkmnName.stats[5].base_stat,
        height: pkmnName.height,
        weight: pkmnName.weight,
        types: pkmnName.types.map( t => t.type.name).join(", ")
    }
    
    return formatPk
}


// const createDbPokemons = async () => {
//     const appiInfo = await getPokemonsApi()
//     // console.log(appiInfo);
//         appiInfo.forEach( async pkmn => {
//         const pkmcreated = await Pokemon.create(pkmn)
//         const typesDB = await Types.findAll({
//             where: { name: pkmn.types }
//         })
//         pkmcreated.addTypes(typesDB)
//     })
//     console.log("Database Pokemons created")
// }


const getPokemonById = async id => {
    const pkmnId = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)).data

const formatPk = {
    id: pkmnId.id,
    name: pkmnId.forms[0].name,
    image: pkmnId.sprites.other["official-artwork"].front_default,
    hp: pkmnId.stats[0].base_stat,
    attack: pkmnId.stats[1].base_stat,
    defense: pkmnId.stats[2].base_stat,  
    speed: pkmnId.stats[5].base_stat,
    height: pkmnId.height,
    weight: pkmnId.weight,
    types: pkmnId.types.map( t => t.type.name).join(", ")
    }
    return formatPk
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
    createDbTypes,
    getAllPokemons,
    getPokemonsApi,
    getPokemonbyName,
    getPokemonById,
    getFormatPokemons,
    getFormatPkmn
}
