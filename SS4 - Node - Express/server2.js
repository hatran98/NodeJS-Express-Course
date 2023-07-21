const express = require('express')
const app = express()
const port = 3001
const fs = require('fs')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<h1>This is HomePage</h1>')
})
app.get('/overview', (req, res) => {
  res.send('<h1>This is Overview Page</h1>')
})
app.get('/product', (req, res) => {
  res.send('<h1>This is Product Page</h1>')
})
app.get('/api/v1/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./users.json'))
  console.log(data)
  res.send(data)
})
app.get('/api/v1/users/:id', (req, res) => {
  const id = req.params.id
  const data = JSON.parse(fs.readFileSync('./users.json'))
  const findData = data.find((user) => user._id == id)
  res.send(findData)
})
app.post('/api/v1/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./users.json'))
  const addData = req.body
  const newData = data.find((dt) => dt.email == addData.email)
  if (newData == undefined) {
    data.push(addData)
    fs.writeFileSync('./users.json', JSON.stringify(data))
    res.status(201).json({ message: `Create successfully id:${addData._id}` })
  }
  else {
    res.status(403).json({
      message: "User already exists"
    })
  }

  res.send(req.body)
})
app.put('/api/v1/users/:id', (req, res) => {
  const id = req.params.id
  const data = JSON.parse(fs.readFileSync('./users.json'))
  const findData = data.findIndex((user) => user._id == id)

  if (findData == -1) {
    res.send({
      message: "User not found"
    })
  }
  else {
    data[findData] = req.body
    fs.writeFileSync('./users.json', JSON.stringify(data))
    res.send({
      message: "Update successfully"
    })
  }
})
app.delete('/api/v1/users/:id', (req, res) => {
  const id = req.params.id
  const data = JSON.parse(fs.readFileSync('./users.json'))
  const findData = data.findIndex((user) => user._id == id)

  if (findData == -1) {
    res.send({
      message: "User not found"
    })
  }
  else {
    data.splice(findData, 1)
    fs.writeFileSync('./users.json', JSON.stringify(data))
    res.send({
      message: "Delete successfully"
    })
  }
})
app.get('/*', (req, res) => {
  res.send('<h1>Error 404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
