import { useMotionValueEvent, motion } from "motion/react"
import { useAnimateMidiPlayback } from "./midi-sync-client-context"
import { MidiData, MidiEvent } from "midi-file"
import { MidiNoteDisplay } from "./midi-note-display"
import { useCallback, useEffect, useRef, useState } from "react"
import { NoteDisplayProps } from "./note-display"

export type MidiPlaybackControllerProps = {
  midiData?: MidiData
}

const MotionMidiNoteDisplay = motion.create(MidiNoteDisplay)

type PlaybackTrackState = {
  lastEventTime: number
  lastEventIndex: number
  noteOffDelay: number
}

// Finds the next event of the specified type in the track, 
// accumulating the delays of any intermediary events along the way
const getNextEvent = (
  track: MidiEvent[], 
  scanStartIndex: number, 
  eventType: 'noteOn' | 'noteOff'
): {
  nextEventIndex: number, 
  nextEventDuration: number
} => {
  let nextEventDuration = 0
  let nextEventIndex = scanStartIndex
  let foundEvent = false
  // accumulate duration of any intermediate events until we 
  // either get to the end of the track
  // or find the desired event
  while (nextEventIndex < track.length && !foundEvent) {
    nextEventDuration += track[nextEventIndex].deltaTime
    if (track[nextEventIndex].type === eventType) {
      foundEvent = true
    } else {
      nextEventIndex += 1
    }
  }

  return {nextEventDuration, nextEventIndex}
}

const getNoteLength = (
  ticksPerBeat: number,
  noteTicks: number,
) => {
  if (noteTicks >= ticksPerBeat) {
    return 'long'
  } else if (noteTicks >= ticksPerBeat / 2) {
    return 'medium'
  } else {
    return 'short'
  }
}

export const MidiPlaybackController = ({
  midiData
}: MidiPlaybackControllerProps) => {
  const playbackTime = useAnimateMidiPlayback()
  const ticksPerBeat = useRef(960)
  const tempo = useRef(600000)
  const trackStates = useRef<PlaybackTrackState[]>([])
  const [countdownValue, setCountdownValue] = useState(0)
  const [holdValue, setHoldValue] = useState(0)
  const [note, setNote] = useState<NoteDisplayProps>()
  
  const processEvent = useCallback((track: MidiEvent[], state: PlaybackTrackState, time: number) => {
    const currentEvent = track[state.lastEventIndex]
    const deltaTimeMs = currentEvent.deltaTime * (tempo.current / (ticksPerBeat.current * 1000))
    
    // Special case of note off - we process immediately and store the delay for the next event
    if (currentEvent.type === 'noteOff') {
      // look ahead for next note on
      const nextNoteOn = getNextEvent(track, state.lastEventIndex + 1, 'noteOn')
      const nextNoteOnEvent = nextNoteOn.nextEventIndex < track.length ? track[nextNoteOn.nextEventIndex] : undefined
      if (nextNoteOnEvent && nextNoteOnEvent.type === 'noteOn') {
        // look ahead for next note off to get note duration
        const nextNoteOff = getNextEvent(track, nextNoteOn.nextEventIndex + 1, 'noteOff')
        setNote({
          noteId: nextNoteOnEvent.noteNumber,
          duration: getNoteLength(ticksPerBeat.current, nextNoteOff.nextEventDuration),
          velocity: nextNoteOnEvent.velocity
        })
      } else {
        setNote(undefined)
      }
      state.noteOffDelay = deltaTimeMs
      state.lastEventIndex += 1
      state.lastEventTime += deltaTimeMs
      return false
    } else if (currentEvent.type === 'noteOn') {
      setNote(prev => {
        if (prev) return prev
        const nextNoteOff = getNextEvent(track, state.lastEventIndex + 1, 'noteOff')
        return {
          noteId: currentEvent.noteNumber,
          duration: getNoteLength(ticksPerBeat.current, nextNoteOff.nextEventDuration),
          velocity: currentEvent.velocity
        }
      })
      if (state.lastEventTime + deltaTimeMs > time) {
        // set hold value to percentage we are through delta
        setCountdownValue(100 * ((time - (state.lastEventTime - state.noteOffDelay)) / (deltaTimeMs + state.noteOffDelay)))
      } else {
        setCountdownValue(100)
      }
    }

    // Check if we keep going or not
    if (state.lastEventTime + deltaTimeMs > time) {
      return false
    }
    
    // Handle Event Type
    if (currentEvent.type === 'endOfTrack') {
      return false
    }
    else if (currentEvent.type === 'setTempo') {
      tempo.current = currentEvent.microsecondsPerBeat
    }
    state.lastEventIndex += 1
    state.lastEventTime += deltaTimeMs
    state.noteOffDelay = 0
    return true
  }, [])

  const processTrack = useCallback((track: MidiEvent[], state: PlaybackTrackState, time: number) => {
    let processing = true
    while (processing) {
      processing = processEvent(track, state, time)
    }
  }, [processEvent])
  
  useMotionValueEvent(playbackTime, 'change', (time) => {
    // Reset if we have gone back in time - we will need to scan
    // from the start of the file again
    if (trackStates.current.some(trackState => (trackState.lastEventTime - trackState.noteOffDelay) > time)) {
      console.log('[Midi Playback Controller] Resetting playback state')
      setCountdownValue(0)
      setHoldValue(0)
      setNote(undefined)
      trackStates.current = []
    }
    if (!midiData || midiData.tracks.length === 0) {
      console.log('[Midi Playback Controller] No Midi Data')
      setCountdownValue(0)
      setHoldValue(0)
      setNote(undefined)
      trackStates.current = []
    } else {
      if (trackStates.current.length !== midiData.tracks.length) {
        trackStates.current = []
        for (let i = 0; i < midiData.tracks.length; i += 1) {
          trackStates.current.push({
            lastEventIndex: 0,
            lastEventTime: 0,
            noteOffDelay: 0,
          })
        }
      }

      for (let i = 0; i < Math.min(midiData.tracks.length, 2); i += 1) {
        processTrack(
          midiData.tracks[i],
          trackStates.current[i],
          time
        )
      }
    }
//    setCountdownValue(Math.min((time % 2000) / 10, 100))
//    setHoldValue(Math.min(Math.max(((time % 2000) / 10) - 100, 0), 100))
  })

  useEffect(() => {
    if (midiData) {
      ticksPerBeat.current = midiData.header.ticksPerBeat || 960
    }
  }, [midiData])

  return (
    <MotionMidiNoteDisplay
      note={note}
      countdownValue={countdownValue}
      holdValue={holdValue}
    />
  )
}
