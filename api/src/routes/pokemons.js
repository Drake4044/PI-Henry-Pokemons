const express = require("express")
const { Pokemon, Types } = require("../db")
const { Op } = require("sequelize");
const { getFormatPokemons, getFormatPkmn, getPokemonsApi } = require("../controllers")
const router = express.Router()

router.get("/", async (req,res) => {
        const { name } = req.query
        if(name) {
            const pokemons = await Pokemon.findAll({    
                where: {
                    name: { [Op.iLike]: `%${name}%` }
                },
                include: {
                    model: Types,
                    attributes: ["name"],
                    through : {
                        attributes: []
                    },
                },
            })
            const pkFormat = getFormatPokemons(pokemons)
            pokemons.length 
            ? res.json(pkFormat)
            : res.status(400).json(`${name} not found`)
        } else {
            const allpokemons = await Pokemon.findAll({
                include: {
                    model: Types,
                    attributes: ["name"],
                    through : {
                        attributes: []
                    }
                },
            })
            const pkFormat = getFormatPokemons(allpokemons)
            allpokemons.length 
            ? res.json(pkFormat)
            : res.res.status(404).json("Pokemons not found")
        }

})


router.get("/:id", async (req,res) => {
    const { id } = req.params
    
        const pkmmId = await Pokemon.findByPk(id, {
            include: {
                model: Types,
                attributes: ["name"],
                through : {
                    attributes: []
                }
            },
        })
        
        if(pkmmId){
            pksFormat = getFormatPkmn(pkmmId) 
            res.json(pksFormat)
        } else {
            res.status(400).json(`${id} not found`)
        }
})

router.post("/" , async (req,res) => {
    const {
        id,
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        types
    } = req.body

    console.log(req.body);

    const pokemonCreated = await Pokemon.create({
        id,
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
    })

    const typesDB = await Types.findAll({
        where: { name: types }
    })
    pokemonCreated.addTypes(typesDB)
    res.json("Pokemon created")
})


module.exports = router