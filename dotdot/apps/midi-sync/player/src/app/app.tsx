import styled from 'styled-components'
import { MidiSyncClientProvider } from '@dotdot/services-midi-sync-react'
import { Route, Routes, } from 'react-router-dom'
import { environment } from '../environment/environment'
import { Playback } from './playback'

const StyledApp = styled.div`
  // Your style here
`

export function App() {
  return (
    <StyledApp>
      <MidiSyncClientProvider endpoint={environment.syncEndpoint}>
        <Routes>
          <Route path='/playback/:file' element={<Playback />} />
        </Routes>
      </MidiSyncClientProvider>
    </StyledApp>
  )
}

export default App
