describe("Calculation", ()=>{
  let aCalculation;
  let testArray1 = [160,591,114,229,230,270,128,1657,624,1503]
  
  let testArray2 = [130,650,99,150,128,302,95,945,368,961]
  let testArray3 = [186,699,132,272,291,331,199,1890,788,1601]
  
  beforeEach(function() {
    aCalculation = new Calculation();
  });
  
  it('should have a .sum property', () => {
     expect(aCalculation.hasOwnProperty('sum')).toBeTruthy()
  })
  
  it('should have a .mean property', () => {
     expect(aCalculation.hasOwnProperty('mean')).toBeTruthy()
  })
  
  it('should have a .stdDev property', () => {
     expect(aCalculation.hasOwnProperty('stdDev')).toBeTruthy()
  })
  
  it('should have a .beta0 property', () => {
     expect(aCalculation.hasOwnProperty('beta0')).toBeTruthy()
  })
  
  it('should have a .beta1 property', () => {
     expect(aCalculation.hasOwnProperty('beta1')).toBeTruthy()
  })
  
  it('should have a .calculate function', () => {
     expect(typeof aCalculation.calculate).toBe('function')
  })
  
  it('should have a .calSum function', () => {
     expect(typeof aCalculation.calSum).toBe('function')
  })
  
  it('should have a .calMean function', () => {
     expect(typeof aCalculation.calMean).toBe('function')
  })
  
  it('should have a .calStdDev function', () => {
     expect(typeof aCalculation.calStdDev).toBe('function')
  })
  
  it('should have a .calCorrelationAndRegression function', () => {
     expect(typeof aCalculation.calCorrelationAndRegression).toBe('function')
  })
  
  it('should have a .calSumXmultiY function', () => {
     expect(typeof aCalculation.calSumXmultiY).toBe('function')
  })
  
  it('should have a .calBeat1 function', () => {
     expect(typeof aCalculation.calBeat1).toBe('function')
  })
  
  it('should have a .calBeta0 function', () => {
     expect(typeof aCalculation.calBeta0).toBe('function')
  })
  
  it('should NOT be hard coded', () => {
      expect(aCalculation.calSum()).toBe(0)
	  expect(aCalculation.calMean()).toBe(0)
	  expect(aCalculation.calStdDev()).toBe(0)
	  expect(aCalculation.calBeat1()).toBe(0)
	  expect(aCalculation.calBeta0().toString()).toBe('0.00')
  })
  
  it('.calSum function, should add ' + testArray1.join(',')  +' and get 5506', function() {
    let aSum = aCalculation.calSum(testArray1)
    expect(aSum).toBe(5506)
  });
  
  it(".calMean function, when a sum has been calculated, should calculate the mean and get 550.60", function() {
      let aSum = aCalculation.calSum(testArray1)
	  let aMean = aCalculation.calMean(aSum, testArray1)
	  expect(Number(aMean)).toBe(550.60);
  });
  
  it(".calStdDev function, when a sum and a mean has been calculated, should calculate the deviation and get 572.0268447", function() {
      let aSum = aCalculation.calSum(testArray1)
	  let aMean = aCalculation.calMean(aSum, testArray1)
	  let aDev = aCalculation.calStdDev(aMean, testArray1)
	  expect(Number(aDev)).toBe(572.0268447);
  });
  
  it(".calculate function, should correctly set Calculation details", function() {
      aCalculation.calculate(testArray1)
	  
	  expect(aCalculation.sum).toBe(5506);
	  
	  expect(Number(aCalculation.mean)).toBe(550.60);
	  
	  expect(Number(aCalculation.stdDev)).toBe(572.0268447);
	  
  });
  
  let arrStrs = "[" + testArray2.join(',') + "] and ["  + testArray3.join(',') + "]"
  
  it(".calSumXmultiY function for " + arrStrs + ", should calculate and get 4303108", function() {
      let aRst = aCalculation.calSumXmultiY(testArray2, testArray3)
	  expect(Number(aRst)).toBe(4303108);
  });
  
  it(".calBeat1 function, calculate the beta1 and get 1.7279", function() {
	  
	  let aRst = aCalculation.calSumXmultiY(testArray2, testArray3)
	  
	  aCalculation.calculate(testArray2)
	  let meanX = aCalculation.mean
	  let stdX = aCalculation.stdDev
	  
	  aCalculation.calculate(testArray3)
	  let meanY = aCalculation.mean
	  
      let aBeata1 = aCalculation.calBeat1(testArray2.length, aRst, stdX, meanY, meanX)
	  expect(Number(aBeata1)).toBe(1.7279);
  });
  
  it(".calBeat0 function, calculate the beta0 and get -22.54", function() {
	  
	  let aRst = aCalculation.calSumXmultiY(testArray2, testArray3)
	  
	  aCalculation.calculate(testArray2)
	  let meanX = aCalculation.mean
	  let stdX = aCalculation.stdDev
	  
	  aCalculation.calculate(testArray3)
	  let meanY = aCalculation.mean
	  
      let aBeata1 = aCalculation.calBeat1(testArray2.length, aRst, stdX, meanY, meanX)
	  
	  let aBeata0 = aCalculation.calBeta0(aBeata1, meanX, meanY)
	  
	  expect(Number(aBeata0)).toBe(-22.54);
  });
  
  it(".calCorrelationAndRegression function, should correctly set Calculation details", function() {
      aCalculation.calCorrelationAndRegression(testArray2,testArray3)
	  
	  expect(Number(aCalculation.beta1)).toBe(1.7279);
	  
	  expect(Number(aCalculation.beta0)).toBe(-22.54);
	  
  });

});
