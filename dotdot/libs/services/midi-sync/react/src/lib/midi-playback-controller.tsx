import { useMotionValueEvent, motion } from "motion/react"
import { useAnimateMidiPlayback } from "./midi-sync-client-context"
import { MidiData, MidiEvent } from "midi-file"
import { MidiNoteDisplay } from "./midi-note-display"
import { useCallback, useEffect, useRef, useState } from "react"

export type MidiPlaybackControllerProps = {
  midiData?: MidiData
}

const MotionMidiNoteDisplay = motion.create(MidiNoteDisplay)

type PlaybackTrackState = {
  lastEventTime: number
  lastEventIndex: number
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
  const [note, setNote] = useState<number>()
  
  const processEvent = useCallback((track: MidiEvent[], state: PlaybackTrackState, time: number) => {
    const currentEvent = track[state.lastEventIndex]
    const deltaTimeMs = currentEvent.deltaTime * (tempo.current / (ticksPerBeat.current * 1000))
    
    // Handle Event Type
    if (currentEvent.type === 'endOfTrack') {
      return false
    }
    else if (currentEvent.type === 'setTempo') {
      tempo.current = currentEvent.microsecondsPerBeat
    } else if (currentEvent.type === 'noteOn') {
      if (state.lastEventTime + deltaTimeMs > time) {
        // set hold value to percentage we are through delta
        setHoldValue(100 * ((time - state.lastEventTime) / deltaTimeMs))
      } else {
        setHoldValue(0)
      }
    } else if (currentEvent.type === 'noteOff') {
      // look ahead for next note
      if (track.length > state.lastEventIndex + 2) {
        const nextEvent = track[state.lastEventIndex + 1]
        if (nextEvent.type === 'noteOn') {
          setNote(nextEvent.noteNumber)
        } else {
          setNote(undefined)
        }
      } else {
        setNote(undefined)
      }
      
      setHoldValue(0)
      if (state.lastEventTime + deltaTimeMs > time) {
        setCountdownValue(100 * ((time - state.lastEventTime) / deltaTimeMs))
      } else {
        setCountdownValue(100)
      }
    }

    // Check if we keep going or not
    if (state.lastEventTime + deltaTimeMs <= time) {
      state.lastEventIndex += 1
      state.lastEventTime += deltaTimeMs
      return true
    } else {
      return false
    }
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
            lastEventTime: 0
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
      note={`${note}`}
      countdownValue={countdownValue}
      holdValue={holdValue}
    />
  )
}
