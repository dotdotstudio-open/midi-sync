import styled from 'styled-components'
import { ClefContextProvider, MidiSyncClientProvider } from '@dotdot/services-midi-sync-react'
import { Route, Routes, } from 'react-router-dom'
import { environment } from '../environment/environment'
import { Playback } from './playback'
import { Control } from './control'

const StyledApp = styled.div`
  // Your style here
`

export function App() {
  return (
    <StyledApp>
      <MidiSyncClientProvider endpoint={environment.syncEndpoint}>
        <ClefContextProvider>
          <Routes>
            <Route path='/controller' element={<Control />} />
            <Route path='/playback/:file' element={<Playback />} />
          </Routes>
        </ClefContextProvider>
      </MidiSyncClientProvider>
    </StyledApp>
  )
}

export default App
