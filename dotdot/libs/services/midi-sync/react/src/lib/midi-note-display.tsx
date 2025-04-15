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
        format={() => `${note}`}
        percent={countdownValue}
        success={{percent: holdValue}}
      />
    </Container>
  )
}
