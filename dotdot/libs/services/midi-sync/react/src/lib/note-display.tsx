import { ReactNode } from "react"
import styled from "styled-components"
import { useClef } from "./clef-context"

export type NoteDisplayProps = {
  noteId: number
  duration: 'short' | 'long'
  velocity: number
}

const NotesContainer = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 50,
  height: 50,
  fontFamily: 'NotoMusic',
  transform: 'translate(-50%, -50%)'
})

const StaffLayer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
  transform: 'translate(25%, 0)'
})

type NoteLayerProps = {
  noteOffset: number
  children: ReactNode
}

const NoteLayer = styled.div<NoteLayerProps>({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
  transform: 'translate(25%, 0)'
}, props => ({
  transform: `translate(25%, ${props.noteOffset * 12}%)`
}))

const ClefLayer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
  transform: 'translate(-50%, 0)'
})

const noteLookup: Record<number, {noteOffset: number}> = {
  69: {
    noteOffset: -1
  },
}

export const NoteDisplay = ({
  noteId,
  duration,
  velocity,
}: NoteDisplayProps) => {

  const clef = useClef()

  return (
    <NotesContainer>
      <StaffLayer>
        {'𝄙'}
      </StaffLayer>
      <ClefLayer>
        {clef}
      </ClefLayer>
      <NoteLayer noteOffset={noteLookup[noteId]?.noteOffset || 0}>
        {noteId ? '𝅗' : ''}
      </NoteLayer> 
    </NotesContainer>
  )
}