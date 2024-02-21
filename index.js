const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello, World')
})

app.get("/oi", function (req, res){
    res.send('Olá, mundo!')
})

// Lista de Personagens
const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

// Read All -> [GET] /item
app.get('/item', function (req, res) {
 // Envio a lista inteira como resposta HTTP  res.send(lista)
})

// Read By ID -> [GET] /item/:id
app.get('/item/:id', function (req, res){
  //Acesso o ID no parâmetro de rota
  const id = req.params.id

  //Acesso item na lista baseado no ID recebido
  const item = lista[id]

  // Envio o item obtido como resposta HTTP
  res.send(item)
})



app.listen(3000)