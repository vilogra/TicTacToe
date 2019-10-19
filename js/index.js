document.addEventListener('DOMContentLoaded', () => {
  
  let optionsButton = document.getElementById("options_submit")

  optionsButton.addEventListener("click", () => {
    optionsButton.innerHTML = 'Reset'

    isEven = value => {
      if (value % 2 == 0) {
        return true
      } else {
        return false
      }
    }

    isOdd = value => {
      if (value % 1 == 0) {
        return true
      } else {
        return false
      }
    }

    scaleUp = array => {
      let first = array[0]

      if (array[0] == "") {
        return false
      } else {
        return array.every(element => {
          return element == first
        })
      }
    }

    let changeBackground = document.getElementById("input_boardcolor").value
    
    let boardSize = parseInt(document.getElementById("input_boardsize").value)

    let gameBoard = []

    let setSquares = (boardSize * boardSize)

    for (let a = 0; a < setSquares; a++) {
      gameBoard.push(a)
    }

    document.getElementById("game").innerHTML = '<div id="board"></div>'

    let board = document.getElementById("board")

    board.style.margin = '0 auto'
    board.style.height = (100 * boardSize) + 'px'
    board.style.width = (100 * boardSize) + 'px'
    board.style.border = 'solid 1px black'

    for (let a = 0; a < setSquares; a++) {
      board.innerHTML += '<div class="square"></div>'
    }

    let squares = document.getElementsByClassName("square")

    for (let a = 0; a < setSquares; a++) {
      squares[a].style.height = '100px'
      squares[a].style.width = '100px'
      squares[a].style.float = 'left'
      squares[a].style.lineHeight = '100px'
      squares[a].setAttribute('id', a.toString())
    }

    if (setSquares % 2 !== 0) {
      for (let a = 0; a < setSquares; a += 2) {
        squares[a].style.backgroundColor = changeBackground
      }
    } else {
      for (let a = 0; a < setSquares; a += 1) {
        if (isEven(a/boardSize)) {
          for (let squareNum = a; squareNum < (a + boardSize); squareNum += 2) {
            squares[squareNum].style.backgroundColor = changeBackground
          }
        } else if (isOdd(a/boardSize)) {
          for (let squareNum = a+1; squareNum < (a + boardSize); squareNum += 2) {
            squares[squareNum].style.backgroundColor = changeBackground
          }
        } else {
          // return
        }
      }
    }

    let changeIndicator = document.getElementById('changeIndicator')

    changeIndicator.style.color = 'black'
    changeIndicator.innerHTML = "X's Turn to Play"

    let boardClicks = 0

    board.addEventListener("click", () => {
      if (determineWinner()) {
        changeIndicator.style.color = 'blue'
        changeIndicator.innerHTML = winningPlayer[0] + ' Wins!'
      } else if (isEven(boardClicks)) {
        changeIndicator.style.color = 'red'
        changeIndicator.innerHTML = "O's Turn to Play"
      } else {
        changeIndicator.style.color = 'black'
        changeIndicator.innerHTML = "X's Turn to Play"
      }
      boardClicks++
    })

    let squareClicks = []

    for (let a = 0; a < setSquares; a++) {
      squareClicks[a] = 0
    }

    let winningPlayer

    let determineWinner = () => {
      for (let a = 0; a < setSquares; a += 1) {
        if ((a % boardSize) == 0) {
          let rowCheck = []
          for (let squareNum = a; squareNum < (a + boardSize); squareNum += 1) {
            rowCheck.push(squares[squareNum].innerHTML)
          }
          console.log('Row ' + a + ' is ' + rowCheck)
          console.log(scaleUp(rowCheck))

          if (scaleUp(rowCheck)) {
            winningPlayer = rowCheck
            return true
          }
        }
      }

      for (let a = 0; a < setSquares; a += 1) {
        if (a < boardSize) {
          let colCheck = []
          for (let squareNum = a; squareNum < setSquares; squareNum += boardSize) {
            colCheck.push(squares[squareNum].innerHTML)
          }
          console.log('Column ' + a + ' is ' + colCheck)
          console.log(scaleUp(colCheck))

          if (scaleUp(colCheck)) {
            winningPlayer = colCheck
            return true
          }
        }
      }

      let firstDiagCheck = []
      for (let a = 0; a < setSquares; a += 1) {
        if ((a % (boardSize + 1)) == 0) {
          console.log(a)
          firstDiagCheck.push(squares[a].innerHTML)
        }
      }
      console.log(firstDiagCheck)
      console.log(scaleUp(firstDiagCheck))
      
      if (scaleUp(firstDiagCheck)) {
        winningPlayer = firstDiagCheck
        return true
      }

      let secondDiagCheck = []
      for (let a = (boardSize - 1); a < (setSquares - 1); a += 1) {
        if ((a % (boardSize - 1)) == 0) {
          console.log(a)
          secondDiagCheck.push(squares[a].innerHTML)
        }
      }
      console.log(secondDiagCheck)
      console.log(scaleUp(secondDiagCheck))

      if (scaleUp(secondDiagCheck)) {
        winningPlayer = secondDiagCheck
        return true
      }
    }

    let countClicks = function() {
      let divID = this.getAttribute("id")
      squareClicks[divID] += 1

      if (isEven(boardClicks) && squareClicks[divID] == 1) {
        this.innerHTML = 'X'
        // this.style.color = 'blue'
      } else if (isOdd(boardClicks) && squareClicks[divID] == 1) {
        this.innerHTML = 'O'
        this.style.color = 'red'
      } else if (!determineWinner()) {
        alert('Already selected.')
        boardClicks -= 1
      } else {
        // return
      }
      
      if (determineWinner()) {
        for (let a = 0; a < setSquares; a++) {
          squareClicks[a] = 2
        }
        document.getElementById('options_submit').innerHTML = 'Play again?'
      }

    }

    for (let a = 0; a < setSquares; a++) {
      squares[a].addEventListener("click", countClicks)
    }

  })

})
