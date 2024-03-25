import { Square } from './Square.tsx'

export const Board = ({
  board,
  updateBoard
}: {
  board: (string | null)[]
  updateBoard: (index: number) => void
}) => {
  return (
    <section className="game">
      {board.map((square, idx) => {
        return (
          <Square key={idx} index={idx} updateBoard={updateBoard}>
            {square}
          </Square>
        )
      })}
    </section>
  )
}
