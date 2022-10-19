import './App.css'
import { useState, useEffect } from 'react'
import Square from './components/Square'
import { Patterns } from './Patterns'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const App = () => {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
  const [player, setPlayer] = useState('X')
  const [result, setResult] = useState({winner: 'none', state: 'none'})

  const MySwal = withReactContent(Swal)

  const checkWinner = () => {
    Patterns.forEach(current => {
      const firstPlayer = board[current[0]]
      if (firstPlayer === '') return

      let countWinPattern = true
      current.forEach(i => {
        if (board[i] !== firstPlayer) {
          countWinPattern = false
        }
      })

      if (countWinPattern) {
        setResult(
          {winner: (player === 'O') 
            ? 'X' 
            : (player === 'X') 
              ? 'O' 
              : 'No one',
            state: 'Won'}
        )
      }
    })
  }

  const checkTie = () => {
    let filled = true
    board.forEach(el => {
      if (el === '') filled = false
    })

    if (filled === true) {
      setResult({winner: 'No one', state: 'Tie'})
    }
  }

  const restartGame = () => {
    setBoard(['', '', '', '', '', '', '', '', ''])
    setPlayer('X')
  }

  useEffect(() => {
    checkTie()
    checkWinner()
  }, [board])

  useEffect(() => {
    if (result.state !== 'none') {
      MySwal.fire({
        title: <strong>Game Finished!</strong>,
        html: `Winner: ${result.winner}`,
      })
      restartGame()
    }
  }, [result])

  const chooseSquare = (square) => {
    setBoard(
      board.map((value, i) => {
        if (i === square && value === '') {
          setPlayer((player === 'X') ? 'O' : 'X')
          return player
        }
        return value
      })
    )
  }
  
  return (
    <div className="App">
      <h1 className='main-text'>Tic-tac-toe</h1>
      <div className='board'>
        <div className='row'>
          <Square 
            val={board[0]} 
            chooseSquare={() => {chooseSquare(0)}}
          />
          <Square 
            val={board[1]} 
            chooseSquare={() => {chooseSquare(1)}}
          />
          <Square 
            val={board[2]} 
            chooseSquare={() => {chooseSquare(2)}}
          />
        </div>
        <div className='row'>
        <Square 
            val={board[3]} 
            chooseSquare={() => {chooseSquare(3)}}
          />
          <Square 
            val={board[4]} 
            chooseSquare={() => {chooseSquare(4)}}
          />
          <Square 
            val={board[5]} 
            chooseSquare={() => {chooseSquare(5)}}
          />
        </div>
        <div className='row'>
        <Square 
            val={board[6]} 
            chooseSquare={() => {chooseSquare(6)}}
          />
          <Square 
            val={board[7]} 
            chooseSquare={() => {chooseSquare(7)}}
          />
          <Square 
            val={board[8]} 
            chooseSquare={() => {chooseSquare(8)}}
          />
        </div>
      </div>
    </div>
  );
}

export default App