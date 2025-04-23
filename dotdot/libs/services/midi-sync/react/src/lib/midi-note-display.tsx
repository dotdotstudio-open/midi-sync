import { Progress } from "antd"
import styled from "styled-components"
import { NoteDisplay, NoteDisplayProps } from "./note-display"

export type MidiNoteDisplayProps = {
  note: NoteDisplayProps
  countdownValue: number
  holdValue: number
}

const Container = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const MidiNoteDisplay = ({
  note,
  countdownValue,
  holdValue,
}: MidiNoteDisplayProps) => {
  
  return (
    <Container>
      <Progress
        type='circle' 
        format={() => <NoteDisplay {...note} />}
        percent={countdownValue}
        success={{percent: holdValue}}
        size={[500, 500]}
      />
    </Container>
  )
}
