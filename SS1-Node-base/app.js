const { log } = require('console')
const { readFileSync } = require('fs')
const fs = require('fs')
const http = require('http')
const url = require('url')
const server = http.createServer((req, res) => {
  const content = fs.readFileSync('./read-this.txt', "utf8")
  const input = fs.readFileSync('./input.txt', "utf8")
  const appen = fs.readFileSync('./append.txt', "utf8")
  const data = fs.readFileSync('./data.json', 'utf8')
  const dataJS = JSON.parse(data)
  const overview = fs.readFileSync('./overview.html', 'utf8')
  const product = fs.readFileSync('./product.html', 'utf8')
  const obj = JSON.parse(data)
  const { query, pathname } = url.parse(req.url, true)
  const id = pathname.slice(9)
  const cardTemplate = fs.readFileSync('./card-template.html', 'utf8')
  const searchInput = fs.readFileSync('./search.html', 'utf8')

  const final = `
  <div style="margin-left:10px">
    <br></br>
    ${input}
    <br></br>
    ${appen}
    <br></br>
    ${content}
    </div>
    `
  fs.writeFileSync('./final.txt', final)
  const searchvalue = query.q

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (pathname == '/' || pathname == '/overview') {
    const listproduct = dataJS.map((fruit) => {
      return (
        cardTemplate.replace("{{image}}", fruit.image)
          .replace("{{productName}}", fruit.productName)
          .replace("{{quantity}}", fruit.quantity)
          .replace("{{price}}", fruit.price)
          .replace("{{id}}", fruit.id)
      )
    })
    const renderOverview = overview.replace("{{cards}}", listproduct)
    res.write(renderOverview)
  }

  else if (pathname == `/product/${id}`) {
    if (dataJS) {
      const dtpro = dataJS.find((prd) => prd.id == id)
      if (dtpro) {
        const detail = product.replace("{{organic}}", dtpro.organic ? ("Organic") : ("Not Organic"))
          .replace("{{productName}}", dtpro.productName)
          .replace("{{quantity}}", dtpro.quantity)
          .replace(/{{price}}/g, dtpro.price)
          .replace("{{id}}", dtpro.id)
          .replace("{{nutrients}}", dtpro.nutrients)
          .replace("{{from}}", dtpro.from)
          .replace("{{description}}", dtpro.description)
          .replace(/{{image}}/g, dtpro.image)
          .replace("{{id}}", dtpro.id)
        res.write(detail)
      }
      else {

        res.write('error')
      }
    }

  }

  else if ((pathname.startsWith("/delete"))) {
    const idDelete = pathname.slice(8)
    const dataDelete = dataJS.filter((del) => del.id != idDelete)
    fs.writeFileSync('./data.json', JSON.stringify(dataDelete))
    res.writeHead(302, { Location: '/' })
    res.end()
  }

  else if ((pathname == '/search') || pathname == `/search/${searchvalue}`) {
    const fillProduct = dataJS.filter((prod) => {
      if (prod.productName && searchvalue) {
        return prod.productName.toLowerCase().includes(searchvalue.toLowerCase());
      }
      return false;
    });
    if (!searchvalue || fillProduct && fillProduct.length > 0) {
      const listprd = fillProduct.map((fruit) => {
        return (
          cardTemplate.replace("{{image}}", fruit.image)
            .replace("{{productName}}", fruit.productName)
            .replace("{{quantity}}", fruit.quantity)
            .replace("{{price}}", fruit.price)
            .replace("{{id}}", fruit.id)
        )
      })
      res.write(searchInput.replace("{{message}}", "FIND YOUR FRUITS").replace("{{cards}}", listprd))

    }
    else {
      res.write(searchInput.replace("{{message}}", "NOT FOUND").replace("{{cards}}", ""))
    }

  }



  else if (pathname == '/contact') {
    res.write('Hello contact')
  }
  else if (pathname == '/final') {
    res.write(final)
  }
  else if (pathname == '/api') {
    res.write(data)
  }
  // else if (pathname == `/api/${id}`) {
  //   if (obj[id]) {
  //     res.write(JSON.stringify(obj[id]))
  //   }
  //   else {
  //     res.write('Lỗi 404')
  //   }
  // }
  else {
    res.write('Error 404')
  }
  res.end()
})
server.listen(3000, function () {
  console.log('listening on port 3000')
})
