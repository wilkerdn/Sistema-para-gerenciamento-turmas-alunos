const express = require('express')
const app = express()
const port = 3001
const rotasPrimarias = require('./routes/index')
const turmas = require('./routes/turmasMongo')

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(rotasPrimarias)
app.use(turmas)

app.listen(port, () => {
  console.log(`Servidor express em: http://localhost:${port}`)
})