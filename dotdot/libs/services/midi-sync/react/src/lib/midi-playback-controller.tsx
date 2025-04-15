import { useMotionValueEvent, motion } from "motion/react"
import { useAnimateMidiPlayback } from "./midi-sync-client-context"
import { MidiData } from "midi-file"
import { MidiNoteDisplay } from "./midi-note-display"
import { useState } from "react"

export type MidiPlaybackControllerProps = {
  midiData?: MidiData
}

const MotionMidiNoteDisplay = motion.create(MidiNoteDisplay)

export const MidiPlaybackController = ({
  midiData
}: MidiPlaybackControllerProps) => {
  const playbackTime = useAnimateMidiPlayback()
  const [countdownValue, setCountdownValue] = useState(0)
  const [holdValue, setHoldValue] = useState(0)
  useMotionValueEvent(playbackTime, 'change', (time) => {
    setCountdownValue(Math.min(time % 200, 100))
    setHoldValue(Math.min(Math.max((time % 200) - 100, 0), 100))
  })
  return (
    <MotionMidiNoteDisplay
      note="T"
      countdownValue={countdownValue}
      holdValue={holdValue}
    />
  )
}
