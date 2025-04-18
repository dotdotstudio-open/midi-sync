import { MidiDataProvider } from "@dotdot/services-midi-sync-react"
import { useParams } from "react-router-dom"
import { environment } from "../environment/environment"
import { MidiDataPlayback } from "./midi-data-playback"

export type PlaybackParams = {
  file: string
}

export const Playback = () => {
  const {file} = useParams<PlaybackParams>()

  return (
    <MidiDataProvider midiFileUrl={`${environment.appDomain}/midi/${file}.mid`}>
      <MidiDataPlayback />
    </MidiDataProvider>
  )
}