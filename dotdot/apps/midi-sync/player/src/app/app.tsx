import styled from 'styled-components'
import {MidiNoteDisplay} from '@dotdot/services-midi-sync-react'
import { Route, Routes, Link } from 'react-router-dom';

const StyledApp = styled.div`
  // Your style here
`

export function App() {
  return (
    <StyledApp>
      <MidiNoteDisplay 
        note='A'
        countdownValue={0.6}
      />
    </StyledApp>
  )
}

export default App
