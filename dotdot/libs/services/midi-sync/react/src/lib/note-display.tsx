
export type NoteDisplayProps = {
  noteId: number
  duration: 'short' | 'long'
  velocity: number
}

export const NoteDisplay = ({
  noteId,
  duration,
  velocity,
}: NoteDisplayProps) => {

  return (
    `${noteId}`
  )
}