// <<MODEL>>
class Calculation {// eslint-disable-line no-unused-vars
  constructor () {
    this.sum = 0
    this.mean = 0
    this.stdDev = 0
    this.allMyNumbers = []

    this.allMyNumbersX = []
    this.allMyNumbersY = []
    this.beta0 = 0
    this.beta1 = 0
  }

  calculate (theAllNumbers = []) {
    this.allMyNumbers = theAllNumbers
    this.sum = this.calSum(this.allMyNumbers)
    this.mean = this.calMean(this.sum, this.allMyNumbers)
    this.stdDev = this.calStdDev(this.mean, this.allMyNumbers)
  }

  calSum (theAllNumbers = []) {
    let aSum = 0
    for (let aNum of theAllNumbers) {
      aSum += aNum
    }
    return aSum
  }

  calMean (aSum = 0, theAllNumbers = []) {
    let numbers = theAllNumbers.length
    let aMean = 0
    if (numbers > 0) {
      aMean = aSum / numbers
      aMean = Number.parseFloat(aMean).toFixed(2)
    }
    return aMean
  }

  calStdDev (aMean = 0, theAllNumbers = []) {
    let aStdDev = 0
    let numbers = theAllNumbers.length
    if (numbers > 0) {
      let squaSum = 0
      for (let aNum of theAllNumbers) {
        let sub = aNum - aMean
        let square = sub * sub
        squaSum += square
      }
      numbers--
      aStdDev = Number.parseFloat(Math.sqrt(squaSum / numbers)).toFixed(7)
    }
    return aStdDev
  }

   /**
    * method follow by:
    * https://www.bmj.com/about-bmj/resources-readers/publications/statistics-square-one/11-correlation-and-regression
    */
  calCorrelationAndRegression (theAllNumbersX = [], theAllNumbersY = []) {
    this.allMyNumbersX = theAllNumbersX
    this.allMyNumbersY = theAllNumbersY

    this.calculate(this.allMyNumbersX)

    let meanX = this.mean
    let stdX = this.stdDev

    this.calculate(this.allMyNumbersY)

    let meanY = this.mean

    let sumAllXmultiY = this.calSumXmultiY(this.allMyNumbersX, this.allMyNumbersY)

    let arrayNums = this.allMyNumbersX.length

    // y = beta1*x + beta0
    this.beta1 = this.calBeat1(arrayNums, sumAllXmultiY, stdX, meanY, meanX)

    this.beta0 = this.calBeta0(this.beta1, meanX, meanY)
  }

  calSumXmultiY (theAllNumbersX = [], theAllNumbersY = []) {
    let result = theAllNumbersX.map((x, index) => x * theAllNumbersY[index]).reduce((i, j) => i + j)

    return result
  }

  calBeat1 (arrayNums, sumAllXmultiY = 0, stdX = 0, meanY = 0, meanX = 0) {
    if (stdX <= 0) {
      return 0
    }

    let stp1 = sumAllXmultiY - (arrayNums * meanX * meanY)
    let stp2 = (arrayNums - 1) * (stdX * stdX)

    let aRst = (stp1 / stp2).toFixed(4)

    return aRst
  }

  calBeta0 (beta1 = 0, meanX = 0, meanY = 0) {
    let result = (meanY - beta1 * meanX).toFixed(2)

    return result
  }
}
