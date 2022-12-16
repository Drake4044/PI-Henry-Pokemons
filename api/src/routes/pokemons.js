const express = require("express")
const { Pokemon, Types } = require("../db")
const { Op } = require("sequelize");
const { getPokemonById, getAllPokemons, getPokemonbyName, getFormatPkmn } = require("../controllers")
const router = express.Router()

router.get("/", async (req,res) => {
        const { name } = req.query
        if(name) {
            try {
                const pokemons = await getPokemonbyName(name)
                res.json(pokemons)
            } catch (error) {
                    const pkmndb = await Pokemon.findOne({ 
                        where: {
                            name: { [Op.like]: `%${name}%` }
                        },
                        include: {
                            model: Types,
                            attributes: ["name"],
                            through : {
                                attributes: []
                            },
                        },
                    })
                    if(pkmndb) {
                        const pkmnFormat = getFormatPkmn(pkmndb)
                        res.json(pkmnFormat)
                    } else {
                        res.status(400).json(`${name} not found`)
                    }
            }
        } else {
            const allpokemons = await getAllPokemons()
            
            allpokemons
            ? res.json(allpokemons)
            : res.status(404).json("Pokemons not found")
        }

})


router.get("/:id", async (req,res) => {
    const { id } = req.params
    try {
        const pkmmId = await getPokemonById(id)
        res.json(pkmmId)
    } catch (error) {
        try {
            const pkmndb = await Pokemon.findOne({ 
                where: {
                    id: id 
                },
                include: {
                    model: Types,
                    attributes: ["name"],
                    through : {
                        attributes: []
                    },
                },
            })
            const pkmnFormat = getFormatPkmn(pkmndb)
            res.json(pkmnFormat)
        } catch (error) {
            res.status(400).json(`${id} not found`)
        }
    }
})

router.post("/" , async (req,res) => {
    try {
        const {
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
    
        const pokemonCreated = await Pokemon.create({
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
    
    } catch (error) {
        if(!req.body.name) res.status(400).json("Name is obligaroty")
        res.status(404).json("Pokemons not create")
    }
})


module.exports = router