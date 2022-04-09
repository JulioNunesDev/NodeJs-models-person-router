const express = require('express')
const app = express()
const mongoose = require('mongoose')






app.use(express.urlencoded({
    extended: true,
    }),
)
app.use(express.json())



// Rotas da API
const routePerson = require('./routes/personRoutes')

app.use('/person', routePerson)

//Rotas iniciais

app.get('/', (req, res)=>{
    res.json({message: 'Oi express!'})
})


//entrega de uma porta de saida
require('dotenv').config()
const DB_USE = process.env.DB_USE
const DB_PASS = process.env.DB_Pass
mongoose.connect(`mongodb+srv://${DB_USE}:${DB_PASS}@apicluster.geygt.mongodb.net/bacodaapi?retryWrites=true&w=majority`)
.then(()=>{
    console.log('Banco de Dados, ON!')
    app.listen(3005, ()=>{
        console.log('Porta: 3005, está aberta!')
    })
})
.catch((err)=>{
    console.log(err)
})
