import { MidiPlaybackControls } from "@dotdot/services-midi-sync-react"
import styled from "styled-components"

const ControlsContainer = styled.div({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  top: 0,
  left: 0,
  alignItems: 'center',
  justifyContent: 'center',
})

export const Control = () => {
  return (
    <ControlsContainer>
      <MidiPlaybackControls />
    </ControlsContainer>
  )
}
