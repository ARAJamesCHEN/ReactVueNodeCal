var http = require('http')
// Please install express module first: npm install express
var express = require('express')
var app = express()
var path = require('path')
var url = require('url')

var CalculationNode = require('./calculation/src/js/CalculationNode')

var calculation = new CalculationNode()

const port = 8000

app.set('port', port)
app.use(express.static(path.join(__dirname, 'calculation')))

var response = {}

// create a route
app.get('/', function (req, res) {
  res.send('Please visit: http://localhost:8000/Calculation-Mean-And-Deviation or http://localhost:8000/Calculation-Correlation-And-Regression')
})

app.get('/Calculation-Mean-And-Deviation', (req, res) => {
  var query = url.parse(req.url, true).query

  console.log(query)

  if (query == null || query.length <= 0 || JSON.stringify(query) === '{}') {
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    res.end('Please input An Array at http://localhost:8000/Calculation-Mean-And-Deviation, ex: http://localhost:8000/Calculation-Mean-And-Deviation?input=160,591,114,229,230,270,128,1657,624,1503')
  } else {
    let allMyNumbers = []
    allMyNumbers = query.input.split(',').map(s => Number(s))

    calculation.calculate(allMyNumbers)

    // json
    response = {
      Input: allMyNumbers,
      Sum: calculation.sum,
      Mean: calculation.mean,
      'Standard Deviation': calculation.stdDev
    }

    console.log('Mean-And-Deviation Calculating Successfully')

    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})

    res.end(JSON.stringify(response))
  }
})

app.get('/Calculation-Correlation-And-Regression', (req, res) => {
  var query = url.parse(req.url, true).query

  console.log(query)

  if (query == null || query.length <= 0 || JSON.stringify(query) === '{}') {
    res.send('Please input two Arrays at http://localhost:8000/Calculation-Correlation-And-Regression, ex: http://localhost:8000/Calculation-Correlation-And-Regression?input1=130,650,99,150,128,302,95,945,368,961&input2=186,699,132,272,291,331,199,1890,788,1601')
  } else {
    if (query.input1 == null || query.input2 == null) {
      res.send('Please input two Arrays with the right style: ex: http://localhost:8000/Calculation-Correlation-And-Regression?input1=130,650,99,150,128,302,95,945,368,961&input2=186,699,132,272,291,331,199,1890,788,1601')
    } else {
      let allMyNumbersX = []
      let allMyNumbersY = []
      allMyNumbersX = query.input1.trim().split(',').map(s => Number(s))
      allMyNumbersY = query.input2.trim().split(',').map(s => Number(s))

      if (allMyNumbersX.length !== allMyNumbersY.length) {
        response = {'Please input the same numbers of array': [allMyNumbersX, allMyNumbersY]}
      } else {
        calculation.calCorrelationAndRegression(allMyNumbersX, allMyNumbersY)

        // json
        response = {
          Input1: allMyNumbersX,
          Input2: allMyNumbersY,
          Beta1: calculation.beta1,
          Beta0: calculation.beta0,
          'Y = Beta0 + Beta1 * X': `Y = ${calculation.beta0} + ${calculation.beta1} * X`
        }
        console.log('Correlation-And-Regression Calculating Successfully')
      }

      res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
      res.end(JSON.stringify(response))
    }
  }
})

var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
