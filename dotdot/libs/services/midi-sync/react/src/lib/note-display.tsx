import { ReactNode } from "react"
import styled from "styled-components"
import { ClefOffsets, useClef } from "./clef-context"
import { noteLookup } from "./notes-lookup"

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

const LedgerLayerDown = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
  transform: 'translate(50%, 100%) scaleX(0.5)'
})

const LedgerLayerUp = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
  transform: 'translate(50%, -100%) scaleX(0.5)'
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
  transform: `translate(54%, ${props.noteOffset * 12.4}%)`
}))

const NoteModifierLayer = styled.div<NoteLayerProps>({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 25, //50 is original font size
}, props => ({
  transform: `translate(8%, ${(props.noteOffset + 3.5) * 12.4}%)` //added 3.5 offset to compensate for smaller font size
}))

const NoteSpeedLayer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
  transform: `translate(-60%, 130%)`
})

export type NoteInfoProps = {
  color: 'red' | 'black' | 'blue' | 'green'
}
const NoteInfoLayer = styled.div<NoteInfoProps & {children: ReactNode}>({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 35,
  transform: `translate(-30%, -120%)`
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

export const NoteDisplay = ({
  noteId,
  duration,
  velocity,
}: NoteDisplayProps) => {

  const clef = useClef()

  const noteOffset = noteLookup[noteId]? noteLookup[noteId].noteOffset + ClefOffsets[clef] : undefined

  return (
    <NotesContainer>
      <StaffLayer>
        {'𝄚'}
      </StaffLayer>
      <LedgerLayerUp>
        {noteOffset && noteOffset < -7 ? '𝄘' : ''}
      </LedgerLayerUp>
      <LedgerLayerDown>
        {noteOffset && noteOffset > 1 ? '𝄘' : ''}
      </LedgerLayerDown>
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
      <NoteSpeedLayer>
        {getNoteVelocitySymbol(velocity)}
      </NoteSpeedLayer>
      <NoteInfoLayer color={noteLookup[noteId]?.info[clef].color || 'black'}>
        {noteLookup[noteId]?.info[clef].text || ''}
      </NoteInfoLayer>
    </NotesContainer>
  )
}