const http = require('http');
const port = 3000;
const fs = require('fs')
const url = require('url');
const { red } = require('@mui/material/colors');
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  const getForm = fs.readFileSync("./views/get-form.html", 'utf8')
  const query = url.parse(req.url, true)
  if (req.method == "POST") {
    let data = ''
    req.on("error", (err) => {
      console.error(err)
    }).on("data", (chunk) => {
      data += chunk.toString();
    }).on("end", () => {
      console.log(decodeURIComponent(data))
    })

  }
  res.write(getForm)
  res.end()
})

server.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})
