import { ClefSelector, MidiPlaybackController, useMidiData } from "@dotdot/services-midi-sync-react"

export const MidiDataPlayback = () => {
  const midiData = useMidiData()

  if (!midiData) {
    return null
  } else {
    return (
      <>
        <MidiPlaybackController midiData={midiData} />
        <ClefSelector />
      </>
    )
  }
}