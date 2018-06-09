var http = require('http')
var url = require('url')
var CalculationNode = require('./calculation/src/js/CalculationNode')
const port = 8000

const calMeanAndDev = 'Calculation-Mean-And-Deviation'
const calCorAndReg = 'Calculation-Correlation-And-Regression'

var server = http.createServer(function (request, response) {
  let reqUrl = request.url

  var query = url.parse(reqUrl, true).query
  console.log(query)

  var responseData = {}

  if (query === null || query === undefined || query.length <= 0 || JSON.stringify(query) === '{}') {
    // OUTPUT PROCESSING
    response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    response.end('Please input parameters!')
  } else {
    var calculation = new CalculationNode()

    if (reqUrl !== null && reqUrl !== undefined) {
      if (reqUrl.indexOf(calMeanAndDev) > 0) {
        let allMyNumbers = []
        allMyNumbers = query.input.split(',').map(s => Number(s))
        calculation.calculate(allMyNumbers)

        // json
        responseData = {
          Input: allMyNumbers,
          Sum: calculation.sum,
          Mean: calculation.mean,
          'Standard Deviation': calculation.stdDev
        }

        console.log('Mean-And-Deviation Calculating Successfully')
      } else if (reqUrl.indexOf(calCorAndReg) > 0) {
        let allMyNumbersX = []
        let allMyNumbersY = []
        allMyNumbersX = query.input1.trim().split(',').map(s => Number(s))
        allMyNumbersY = query.input2.trim().split(',').map(s => Number(s))

        if (allMyNumbersX.length !== allMyNumbersY.length) {
          responseData = {'Please input the same numbers of array': [allMyNumbersX, allMyNumbersY]}
        } else {
          calculation.calCorrelationAndRegression(allMyNumbersX, allMyNumbersY)

          // json
          responseData = {
            Input1: allMyNumbersX,
            Input2: allMyNumbersY,
            Beta1: calculation.beta1,
            Beta0: calculation.beta0,
            'Y = Beta0 + Beta1 * X': `Y = ${calculation.beta0} + ${calculation.beta1} * X`
          }
          console.log('Correlation-And-Regression Calculating Successfully')
        }
      } else {
        responseData = {'No Result': reqUrl}
        console.log('No Match for the request url: ' + reqUrl)
      }
    }

    // OUTPUT PROCESSING
    response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    let jsonData = JSON.stringify(responseData)
    console.log(jsonData)
    response.write(jsonData)
  }

  response.end()
})

server.listen(port, function () {
  console.log('Express server listening on port ' + port)
})
