import { MidiDataProvider } from "@dotdot/services-midi-sync-react"
import { useParams } from "react-router-dom"
import { environment } from "../environment/environment"
import { MidiDataPlayback } from "./midi-data-playback"
import styled from "styled-components"

export type PlaybackParams = {
  file: string
}

const PlaybackContainer = styled.div({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Playback = () => {
  const {file} = useParams<PlaybackParams>()

  return (
    <MidiDataProvider midiFileUrl={`${environment.appDomain}/midi/${file}.mid`}>
      <PlaybackContainer>
        <h1>{file}</h1>
        <MidiDataPlayback />
      </PlaybackContainer>
    </MidiDataProvider>
  )
}