const express = require('express')
const { MongoClient, ObjectId } = require ('mongodb')

const dbUrl = 'mongodb+srv://admin:eyrruoghFAaR7qYu@cluster0.bbuxfsz.mongodb.net'
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



app.listen(3000)

}

main()