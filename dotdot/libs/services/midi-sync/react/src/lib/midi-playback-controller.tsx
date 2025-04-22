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
      // look ahead for next note
      if (track.length > state.lastEventIndex + 2) {
        const nextEvent = track[state.lastEventIndex + 1]
        if (nextEvent.type === 'noteOn') {
          let noteDuration = ticksPerBeat.current
          if (track.length > state.lastEventIndex + 3) {
            const nextNextEvent = track[state.lastEventIndex + 2]
            if (nextNextEvent.type === 'noteOff') {
              noteDuration = nextNextEvent.deltaTime
            }
          }
          setNote({
            noteId: nextEvent.noteNumber,
            duration: noteDuration > (ticksPerBeat.current / 8) ? 'long' : 'short',
            velocity: nextEvent.velocity
          })
          state.noteOffDelay = deltaTimeMs
          state.lastEventIndex += 1
          state.lastEventTime += deltaTimeMs
          return false
        }
      }
    } else if (currentEvent.type === 'noteOn') {
      setNote(prev => {
        if (prev) return prev
        let noteDuration: 'short' | 'long' = 'long'
        if (track.length > state.lastEventIndex + 2) {
          const nextEvent = track[state.lastEventIndex + 1]
          if (nextEvent.type === 'noteOff') {
            noteDuration = nextEvent.deltaTime > (ticksPerBeat.current / 8) ? 'long' : 'short'
          }
        }
        return {
          noteId: currentEvent.noteNumber,
          duration: noteDuration,
          velocity: currentEvent.velocity,
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
    if (trackStates.current.some(trackState => trackState.lastEventTime > time)) {
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
