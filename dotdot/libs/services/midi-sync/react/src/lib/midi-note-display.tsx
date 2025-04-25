import { Progress } from "antd"
import styled from "styled-components"
import { NoteDisplay, NoteDisplayProps } from "./note-display"
import { ReactNode } from "react"

export type MidiNoteDisplayProps = {
  note: NoteDisplayProps
  countdownValue: number
  holdValue: number
}

type ContainerProps = {
  scale: number
  children: ReactNode
}
const Container = styled.div<ContainerProps>({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}, props => ({
  transform: `scale(${props.scale})`
}))

export const MidiNoteDisplay = ({
  note,
  countdownValue,
  holdValue,
}: MidiNoteDisplayProps) => {

  const transformScale = Math.min(window.screen.availWidth / 540, 1)

  return (
    <Container scale={transformScale}>
      <Progress
        type='circle' 
        format={() => <NoteDisplay {...note} />}
        percent={countdownValue}
        success={{percent: holdValue}}
        size={500}
      />
    </Container>
  )
}
