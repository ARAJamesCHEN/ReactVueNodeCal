/* global Vue XMLHttpRequest */
let taskThree = new Vue({// eslint-disable-line no-unused-vars
  el: '#cal_node_one',
  data: {
    hasInput: false,
    allTheNumberStr: '',
    responseData: ''
  },
  methods: {
    doCalMeanAndStd: function () {
      let theArrayStr = this.allTheNumberStr
      if (theArrayStr != null && theArrayStr.trim().length > 0) {
        this.hasInput = true
      } else {
        this.hasInput = false
      }

      this.allTheNumberStr = ''

      if (document.getElementById('output1') != null) {
        document.getElementById('output1').innerHTML = ''
      }

      let paras = ''

      if (this.hasInput) {
        paras = `?input=${theArrayStr}`

        var url = `http://localhost:8000/Calculation-Mean-And-Deviation${paras}`
        var http = new XMLHttpRequest()

        http.onreadystatechange = function () {
          if (http.readyState === 4 && http.status === 200) {
            console.log(http.responseText)

            if (document.getElementById('output1') != null) {
              document.getElementById('output1').innerHTML = http.responseText
            }
          }
        }
        http.open('GET', url)
        http.send()
      }
    }
  }
})

let taskFour = new Vue({// eslint-disable-line no-unused-vars
  el: '#cal_node_two',
  data: {
    hasInput: false,
    arrsNum: 0,
    allTheNumberStrX: '',
    allTheNumberStrY: '',
    warning: 'Please Input 2 Arrays!'
  },
  methods: {
    doCalBetas: function () {
      let theArrayStrX = this.allTheNumberStrX
      let theArrayStrY = this.allTheNumberStrY
      if (theArrayStrX != null && theArrayStrX.trim().length > 0) {
        if (this.arrsNum !== 1) {
          this.arrsNum = 1
        }
        this.warning = 'Please Input Array 2!'
      }

      if (theArrayStrY != null && theArrayStrY.trim().length > 0) {
        if (this.arrsNum === 1) {
          this.arrsNum = 2
        }
        this.warning = 'Please Input Array 1!'
      }

      if (document.getElementById('output3') != null) {
        document.getElementById('output3').innerHTML = ''
      }

      if (this.arrsNum < 2) {
        this.hasInput = false
      } else {
        this.warning = 'Please Input 2 Arrays!'
        this.arrsNum = 0
        this.hasInput = true
        this.allTheNumberStrX = ''
        this.allTheNumberStrY = ''

        let paras = ''

        if (this.hasInput) {
          paras = `?input1=${theArrayStrX}&input2=${theArrayStrY}`
        }

        var url = `http://localhost:8000/Calculation-Correlation-And-Regression${paras}`
        var http = new XMLHttpRequest()

        http.onreadystatechange = function () {
          if (http.readyState === 4 && http.status === 200) {
            console.log(http.responseText)
            if (document.getElementById('output3') != null) {
              document.getElementById('output3').innerHTML = http.responseText
            }
          }
        }
        http.open('GET', url)
        http.send()
      }
    }
  }
})
