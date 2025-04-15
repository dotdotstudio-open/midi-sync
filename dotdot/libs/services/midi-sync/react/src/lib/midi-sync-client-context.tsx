import { MidiSyncServiceClient } from '@dotdot/services-midi-sync-client'
import { useAnimationFrame, useMotionValue } from 'motion/react'
import { createContext, useCallback, useContext, useEffect, useRef } from 'react'

export type MidiSyncClientContextType = MidiSyncServiceClient | null
export const MidiSyncClientContext = createContext<MidiSyncClientContextType>(null)

export const useAnimateMidiPlayback = () => {
  const midiSyncClient = useContext(MidiSyncClientContext)
  const playbackStartTime = useRef<Date>(undefined)
  const playbackTime = useMotionValue(0)

  useAnimationFrame(() => {
    if (playbackStartTime.current) {
      playbackTime.set(Math.max(Date.now() - playbackStartTime.current.valueOf(), 0))
    } else {
      playbackTime.set(0)
    }
  })

  const onPlaybackTrigger = useCallback(({serverTime, startDelayMs}: {serverTime: number, startDelayMs: number}) => {
    const startTime = new Date(serverTime + startDelayMs)
    playbackStartTime.current = startTime
  }, [])

  useEffect(() => {
    const listener = midiSyncClient ? midiSyncClient.on('startPlayback', onPlaybackTrigger) : undefined
    return () => {
      listener?.dispose()
    }
  }, [midiSyncClient, onPlaybackTrigger])
}
