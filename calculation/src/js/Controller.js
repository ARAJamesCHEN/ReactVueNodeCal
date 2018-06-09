/* global Vue Calculation */
let taskOne = new Vue({// eslint-disable-line no-unused-vars
  el: '#root',
  data: {
    hasInput: false,
    allTheNumberStr: '',
    dealNumObj: new Calculation()
  },
  methods: {
    doCalMeanAndStd: function () {
      let allMyNumbers = []
      let theArrayStr = this.allTheNumberStr
      if (theArrayStr != null && theArrayStr.trim().length > 0) {
        allMyNumbers = theArrayStr.split(',').map(s => Number(s))
        this.hasInput = true
      } else {
        this.hasInput = false
      }
      console.log(this.hasInput)
      this.allTheNumberStr = ''

      this.dealNumObj.calculate(allMyNumbers)
    }
  }
})

let taskTwo = new Vue({// eslint-disable-line no-unused-vars
  el: '#correg',
  data: {
    hasInput: false,
    arrsNum: 0,
    allTheNumberStrX: '',
    allTheNumberStrY: '',
    dealNumObj: new Calculation(),
    warning: 'Please Input 2 Arrays!'
  },
  methods: {
    doCalBetas: function () {
      let allMyNumbersX = []
      let allMyNumbersY = []
      let theArrayStrX = this.allTheNumberStrX
      let theArrayStrY = this.allTheNumberStrY
      if (theArrayStrX != null && theArrayStrX.trim().length > 0) {
        allMyNumbersX = theArrayStrX.split(',').map(s => Number(s))
        if (this.arrsNum !== 1) {
          this.arrsNum = 1
        }
        this.warning = 'Please Input Array 2!'
      }

      if (theArrayStrY != null && theArrayStrY.trim().length > 0) {
        allMyNumbersY = theArrayStrY.split(',').map(s => Number(s))
        if (this.arrsNum === 1) {
          this.arrsNum = 2
        }
        this.warning = 'Please Input Array 1!'
      }

      if (this.arrsNum < 2) {
        this.hasInput = false
        console.log('1:' + this.arrsNum)
      } else if (allMyNumbersX.length !== allMyNumbersY.length) {
        this.hasInput = false
        this.warning = 'Please Input 2 Arrays with same length!'
      } else {
        this.warning = 'Please Input 2 Arrays!'
        this.arrsNum = 0
        this.hasInput = true
        this.allTheNumberStrX = ''
        this.allTheNumberStrY = ''

        this.dealNumObj.calCorrelationAndRegression(allMyNumbersX, allMyNumbersY)
      }
    }
  }
})
