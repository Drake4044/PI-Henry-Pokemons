const express = require("express")
const { Types } = require("../db")
const router = express.Router()

router.get("/", async (req,res) => {
        try {
                const allTypes = await Types.findAll()
                res.json(allTypes)      
        } catch (error) {
                console.log(error)
        }
})


module.exports = router