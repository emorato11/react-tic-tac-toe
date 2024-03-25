export const Square = ({
  children,
  updateBoard,
  index,
  isSelected
}: {
  children: React.ReactNode
  isSelected?: boolean
  index?: number
  updateBoard?: (index: number) => void
}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    if (updateBoard && index !== undefined) updateBoard(index)
  }
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}
