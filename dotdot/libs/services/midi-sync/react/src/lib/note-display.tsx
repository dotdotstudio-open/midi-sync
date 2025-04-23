import { ReactNode } from "react"
import styled from "styled-components"
import { Clef, useClef } from "./clef-context"

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
}, props => ({
  transform: `translate(54%, ${props.noteOffset * 12}%)`
}))

const NoteModifierLayer = styled.div<NoteLayerProps>({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
}, props => ({
  transform: `translate(8%, ${props.noteOffset * 12}%)`
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

type NoteOffsetLookup = Record<Clef, number>

type NoteDisplayLookupProps = {
  noteOffset: NoteOffsetLookup,
  modifier?: 'flat' | 'sharp'
}
const noteLookup: Record<number, NoteDisplayLookupProps> = {
  69: {
    noteOffset: {
      '𝄞': -1,
      '𝄢': 0,
    },
    modifier: 'flat',
  },
  70: {
    noteOffset: {
      '𝄞': 1,
      '𝄢': 2,
    },
    modifier: 'sharp',
  },
  71: {
    noteOffset: {
      '𝄞': -1,
      '𝄢': 0,
    },
  }
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
        {'𝄚'}
      </StaffLayer>
      <ClefLayer>
        {clef}
      </ClefLayer>
      <NoteLayer noteOffset={noteLookup[noteId]?.noteOffset[clef] || 0}>
        {noteId ? '𝅘' : ''}
      </NoteLayer>
      <NoteModifierLayer noteOffset={noteLookup[noteId]?.noteOffset[clef] || 0}>
        {noteLookup[noteId]?.modifier === 'flat' ? 
          '♭'
        : noteLookup[noteId]?.modifier === 'sharp' ?
          '♯'
        :
          ''
        }
      </NoteModifierLayer>
    </NotesContainer>
  )
}