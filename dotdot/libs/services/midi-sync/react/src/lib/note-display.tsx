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

const NoteSpeedLayer = styled.div<NoteLayerProps>({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
}, props => ({
  transform: `translate(54%, ${96 + (props.noteOffset * 12)}%)`
}))

type NoteInfoProps = {
  color: 'red' | 'black' | 'blue' | 'green'
}
const NoteInfoLayer = styled.div<NoteInfoProps & {children: ReactNode}>({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 30,
  transform: `translate(25%, -80%)`
}, props => ({
  color: props.color
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

const getNoteVelocitySymbol = (velocity: number) => {
  if (velocity < 33) {
    return '𝆏𝆏'
  } else if (velocity < 49) {
    return '𝆏'
  } else if (velocity < 64) {
    return '𝆐𝆏'
  } else if (velocity < 80) {
    return '𝆐𝆑'
  } else if (velocity < 96) {
    return '𝆑'
  } else {
    return '𝆑𝆑'
  }
}

type NoteOffsetLookup = Record<Clef, number>

type NoteDisplayLookupProps = {
  noteOffset: NoteOffsetLookup
  modifier?: 'flat' | 'sharp'
  text: string
} & NoteInfoProps
const noteLookup: Record<number, NoteDisplayLookupProps> = {
  //A natural
  69: {
    noteOffset: {
      '𝄞': -2,
      '𝄢': 0,
      '𝄡': -1
    },
    //modifier: 'flat',
    text: 'A0',
    color: 'blue',
  },
  70: {
    noteOffset: {
      '𝄞': 1,
      '𝄢': 2,
      '𝄡': -1
    },
    modifier: 'sharp',
    text: 'A',
    color: 'black',
  },
  71: {
    noteOffset: {
      '𝄞': -1,
      '𝄢': 0,
      '𝄡': -1
    },
    text: 'B',
    color: 'blue',
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
      <NoteSpeedLayer noteOffset={noteLookup[noteId]?.noteOffset[clef] || 0}>
        {getNoteVelocitySymbol(velocity)}
      </NoteSpeedLayer>
      <NoteInfoLayer color={noteLookup[noteId]?.color || 'black'}>
        {noteLookup[noteId]?.text || ''}
      </NoteInfoLayer>
    </NotesContainer>
  )
}