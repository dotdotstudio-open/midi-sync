import styled from 'styled-components'
import {MidiNoteDisplay, MidiPlaybackController, MidiPlaybackControls, MidiSyncClientProvider} from '@dotdot/services/midi-sync/react'
import { Route, Routes, Link } from 'react-router-dom';

const StyledApp = styled.div`
  // Your style here
`

export function App() {
  return (
    <StyledApp>
      <MidiSyncClientProvider endpoint=''>
        <MidiPlaybackController />
        <MidiPlaybackControls />
      </MidiSyncClientProvider>
    </StyledApp>
  )
}

export default App
