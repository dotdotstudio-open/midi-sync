import { Progress } from "antd"
import styled from "styled-components"

export type MidiNoteDisplayProps = {
  note: string
  countdownValue: number
  holdValue: number
}

const Container = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
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
        format={() => holdValue}
        percent={countdownValue}
        success={{percent: holdValue}}
      />
      <h1>{note}</h1>
    </Container>
  )
}
