const route = require('express').Router()
const Person = require('../models/person')

route.post('/', async(req, res)=>{
    const {name, salary, approved} = req.body

    if(!name){
        res.status(422).json({message: 'nome é obrigatorio'})
        return
    }
    const person = {
         name,
         salary, 
         approved 
        }


    try {
        await Person.create(person)
        res.status(201).json({message: 'pessoa inserida com sucesso'})

    } catch (error) {
        res.status(500).json({error: 'error ao criar pessoa'})
    }

})

//leitura de dados


route.get('/', async(req, res)=>{
    try {

        const people = await Person.find()
        res.status(200).json(people)
        
    } catch (error) {
        res.status(500).json({error: 'error ao criar pessoa'})
    }
})


route.get('/:id', async(req, res)=>{
    const id = req.params.id 
    try {

        const personId = await Person.findOne({ _id: id})

        if(!personId){
            res.status(422).json({message: 'O usuario nao foi encontrado'})
            return
        }
        res.status(200).json(personId)
        
    } catch (error) {
        res.status(500).json({error: 'error ao criar pessoa'})
    }
})

//update 


route.patch('/:id', async(req, res)=>{
    const id = req.params.id 

    const {name, salary, approved } = req.body


    const person= {
        name,
         salary,
          approved,
    }


    try {

        const UpdatePersonId = await Person.updateOne({ _id: id}, person)

        if(UpdatePersonId.matchedCount === 0){
            res.status(422).json({message: 'O usuario nao foi encontrado'})
            return
        }

        res.status(200).json(person)
        
    } catch (error) {
        res.status(500).json({error: 'error ao atualizar a pessoa'})
    }
})

//delete 


route.delete('/:id', async(req, res)=>{
    const id = req.params.id 
    const PersonID = await Person.findOne({ _id: id})

    if(!PersonID){
        res.status(422).json({message: 'O usuario nao foi encontrado'})
        return
    }


    try {
        await Person.deleteOne({_id: id})


        res.status(200).json({message: 'Usuario removido com sucesso'})
        
    } catch (error) {
        res.status(500).json({error: 'error ao excluir a pessoa'})
    }
})
module.exports = route