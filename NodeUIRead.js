var http = require('http')
var fs = require('fs')
var url = require('url')
// Please install express module first: npm install express
var express = require('express')
var app = express()
var path = require('path')
app.use(express.static(path.join(__dirname, 'calculation')))

const port = 8000

let server = http.createServer((request, response) => {
  var pathname = url.parse(request.url).pathname
  console.log('Request for ' + pathname + ' received.')

  var needPath = pathname.substr(1)

  if (needPath.includes('.html')) {
    needPath = 'calculation/uis/' + pathname.substr(1)

    fs.readFile(needPath, function (err, data) {
      if (err) {
        console.log(err)
        response.writeHead(404, {'Content-Type': 'text/html'})
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'})

        response.write(data.toString())
      }

      response.end()
      console.log('in1')
    })

    console.log('out1')
  } else if (needPath.includes('.css')) {
    needPath = 'calculation/' + pathname.substr(1)

    fs.readFile(needPath, function (err, data) {
      if (err) {
        console.log(err)
        response.writeHead(404, {'Content-Type': 'text/css'})
      } else {
        response.writeHead(200, {'Content-Type': 'text/css'})

        response.write(data.toString())
      }

      response.end()
      console.log('in2')
    })

    console.log('out2')
  } else if (needPath.includes('.js')) {
    needPath = 'calculation/' + pathname.substr(1)

    fs.readFile(needPath, function (err, data) {
      if (err) {
        console.log(err)
        response.writeHead(404, {'Content-Type': 'text/html'})
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'})

        response.write(data.toString())
      }

      response.end()
      console.log('in3')
    })

    console.log('out3')
  } else if (needPath.includes('.png')) {
    needPath = 'calculation/' + pathname.substr(1)

    fs.readFile(needPath, function (err, data) {
      if (err) {
        console.log(err)
        response.writeHead(404, {'Content-Type': 'text/html'})
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'})

        response.write(data, 'Base64')
      }

      response.end()

      console.log('in4')
    })

    console.log('out4')
  } else {
    response.write('Please visit: http://localhost:8000/calNumVue.html')
    response.end()
  }

  console.log('Request is handled')
})

server.listen(port, function () {
  console.log('Express server listening on port ' + port)
})
