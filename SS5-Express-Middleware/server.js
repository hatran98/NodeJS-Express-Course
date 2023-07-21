const express = require('express')
const port = 3000

const app = express()
const user = {
  username: "Caotv",
  password: "12321"
}
const reqUser = {
  username: "Caotv",
  password: "12321"
}
const middleWareCheckLogin = (req, res, next) => {
  //logic code
  if (reqUser.username == user.username && reqUser.password == user.password) {
    console.log('Login success')
    next()
  }
  else {
    console.log('Login Error')
    res.redirect('/login')
  }
}
app.get('/', (req, res) => {
  res.send('<h1> Đây là homepage</h1>')
})
app.get('/payment', middleWareCheckLogin, (req, res) => {
  res.send('<h1> Trang này yêu cầu đăng nhập</h1>')
})
app.get('/login', (req, res) => {
  res.send('<h1> Đây là trang login</h1>')
})
app.listen(port, () => {
  console.log(`server listening on port : http://localhost:${port}/`)
})
