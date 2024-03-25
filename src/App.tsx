import { useState } from 'react'
import confetti from 'canvas-confetti'

import './App.css'

import { Square } from './components/Square.tsx'
import { WinnerModal } from './components/WinnerModal.tsx'
import { Board } from './components/Board.tsx'

import { Board as BoardType } from './components/types.ts'

import { TURNS } from './constants'
import { checkEndGame, checkWinner } from './logic'

function App() {
  const [board, setBoard] = useState<BoardType>(() => {
    const boardFromStorage = window.localStorage.getItem('board')

    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')

    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState<string | false | null>(null)

  const updateBoard = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <>
      <main className="board">
        <h1>Tic tac toe</h1>
        <Board board={board} updateBoard={updateBoard} />

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
      </main>
    </>
  )
}

export default App
