import { ReactNode } from "react"
import styled from "styled-components"
import { Clef, ClefOffsets, useClef } from "./clef-context"

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
  transform: 'translate(-90%, -50%) scale(2)'
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

const LedgerLayer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
  transform: 'translate(50%, 100%) scaleX(0.5)'
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
  fontSize: 35,
  transform: `translate(25%, -120%)`
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
  transform: 'translate(-55%, 0)'
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

type NoteDisplayLookupProps = {
  noteOffset: number
  modifier?: 'flat' | 'sharp'
  info: Record<Clef, {text: string} & NoteInfoProps>
}
const noteLookup: Record<number, NoteDisplayLookupProps> = {
  //A natural
  69: {
    noteOffset: 0,
    //modifier: 'flat',
    info: {
      '𝄞': {
        text: 'A0',
        color: 'blue',
      },
      '𝄢': {
        text: 'A0',
        color: 'blue',
      },
      '𝄡': {
        text: 'A0',
        color: 'blue',
      },
    }
  },
  70: {
    noteOffset: 1,
    modifier: 'sharp',
    info: {
      '𝄞': {
        text: 'A0',
        color: 'blue',
      },
      '𝄢': {
        text: 'A0',
        color: 'blue',
      },
      '𝄡': {
        text: 'A0',
        color: 'blue',
      },
    }
  },
  71: {
    noteOffset: 2,
    info: {
      '𝄞': {
        text: 'A0',
        color: 'blue',
      },
      '𝄢': {
        text: 'A0',
        color: 'blue',
      },
      '𝄡': {
        text: 'A0',
        color: 'blue',
      },
    }
  }
}

export const NoteDisplay = ({
  noteId,
  duration,
  velocity,
}: NoteDisplayProps) => {

  const clef = useClef()

  const noteOffset = noteLookup[noteId]?.noteOffset ? noteLookup[noteId].noteOffset + ClefOffsets[clef] : undefined

  return (
    <NotesContainer>
      <StaffLayer>
        {'𝄚'}
      </StaffLayer>
      <LedgerLayer>
        {noteOffset && noteOffset < -4 ? '𝄘' : ''}
      </LedgerLayer>
      <ClefLayer>
        {clef}
      </ClefLayer>
      <NoteLayer noteOffset={noteOffset || 0}>
        {noteId ? '𝅘' : ''}
      </NoteLayer>
      <NoteModifierLayer noteOffset={noteOffset || 0}>
        {noteLookup[noteId]?.modifier === 'flat' ? 
          '♭'
        : noteLookup[noteId]?.modifier === 'sharp' ?
          '♯'
        :
          ''
        }
      </NoteModifierLayer>
      <NoteSpeedLayer noteOffset={noteOffset || 0}>
        {getNoteVelocitySymbol(velocity)}
      </NoteSpeedLayer>
      <NoteInfoLayer color={noteLookup[noteId]?.info[clef].color || 'black'}>
        {noteLookup[noteId]?.info[clef].text || ''}
      </NoteInfoLayer>
    </NotesContainer>
  )
}