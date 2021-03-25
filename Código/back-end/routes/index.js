const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('<h1>Trabalho Final Mongo DB - Wilker Nunes</h1>') 
})

module.exports = router;