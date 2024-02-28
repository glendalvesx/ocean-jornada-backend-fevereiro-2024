require('dotenv').config()
const express = require('express')
const { MongoClient, ObjectId } = require ('mongodb')

const dbUrl = process.env.DATABASE_URL
const dbName = 'OceanJornadaBackendFev2024'

async function main(){
 const client = new MongoClient(dbUrl)

 console.log('Conectando ao banco de dados...')
 await client.connect()
 console.log("Banco de dados conectado com sucesso!")

 const app = express()

 app.get('/', function (req, res) {
  res.send('Hello, World')
 })

app.get("/oi", function (req, res){
    res.send('Olá, mundo!')
})

// Lista de Personagens
const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']
 
const db = client.db(dbName)
const collection = db.collection('items')

// Read All -> [GET] /item
app.get('/item', async function (req, res) {
  //Realizamos a operação de find no collection do MongoDB
  const items = await collection.find().toArray()

 // Envio a lista inteira como resposta HTTP  
 res.send(items)
})

// Read By ID -> [GET] /item/:id
app.get('/item/:id', async function (req, res){
  //Acesso o ID no parâmetro de rota
  const id = req.params.id

  //Acesso item na lista baseado no ID recebido
  const item = await collection.findOne({
    _id: new ObjectId(id)
  })

  // Envio o item obtido como resposta HTTP
  res.send(item)
})

// Sinalizamos que o corpo da requisição está em JSON
app.use(express.json())

// Create -> [POST] /item
app.post('/item', async function (req, res) {
  // Extraímos o corpo da requisição
  const item = req.body

  // Colocamos o item dentro da lista de itens
  await collection.insertOne(item)

  // Enviamos uma resposta de sucesso
  res.send(item)
})

 //Update -> [PUT] /item/:id
 app.put('/item/:id', async function (req, res) {
  // pegamos o ID recebido pela rota
  const id = req.params.id

  // pegamos o novo item do corpo da requisição
  const novoItem = req.body

  // atualizar o documento na collection
  await collection.updateOne(
    {_id: new ObjectId(id) },
    { $set: novoItem }

  )

  res.send('Item atualizado com sucesso!')
 })

 //Delete -> [DELETE] /item/:id
 app.delete('/item/:id', async function (req, res) {
  //pegamos o Id da rota
  const id = req.params.id
  
  // realizamos a operação DELETE
  await collection.deleteOne({_id: new ObjectId(id) })

  // enviamos uma mensagem de sucesso
  res.send('Item removido com sucesso!')
 })



app.listen(3000)

}

main()