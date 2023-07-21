const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')
app.use(bodyParser.urlencoded({ extended: true }))
// 1. Express là gì gì: Là 1 framework server được xây dựng dựa trên nền tảng NodeJS
//- Express giúp chúng ta dễ dàng sử dụng các hàm có sẵn để viết API dễ dàng hơn
//- Ưu điểm : Express hoạt động nhanh , câu lệnh ngắn gọn

// 2. Khái niệm routing trong Express
/*
Cấu trúc : app.[GET , POST , PUT , PATCH , DELETE] ('/route' , () => {
  enter logic code
 })
 */
// req : là 1 object chứa toàn bộ thông tin người dùng gửi về cho server
// res : là 1 obj chứa các phương thức mà server gửi về cho client
app.get('/', (req, res) => {
  res.send('<h1>Đây là Homepage!</h1>')
})
app.get('/products', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./db.json'))
  res.send(data)
})
app.get('/product-detail', (req, res) => {
  res.send('<h1>Đây là product detail page!</h1>')
})


app.post('/product', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./db.json'))
  data.users.push(req.body)
  fs.writeFileSync('db.json', JSON.stringify(data))
  res.send(data)
})


// Bài tập: Tạo ra 1 file data.json chứa data users như trên
// Sau khi sử dụng method POST => log ra data xem nhận được chưa
// Khi đã đọc được data từ req.body => sử dụng lệnh writeFile hoặc writeFileSync để thêm dữ liệu vào data.json
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
