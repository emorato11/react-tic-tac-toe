import { Board } from './components/types'
import { COMBO_WINNERS } from './constants'

export const checkWinner = (boardToCheck: Board) => {
  for (const combo of COMBO_WINNERS) {
    const [a, b, c] = combo

    if (boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c])
      return boardToCheck[a]
  }
  return null
}

export const checkEndGame = (newBoard: Board) => {
  return newBoard.every((square) => square !== null)
}
