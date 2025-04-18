import { MidiSyncServiceClient } from '@dotdot/services-midi-sync-client'
import { useAnimationFrame, useMotionValue } from 'motion/react'
import { createContext, useCallback, useContext, useEffect, useRef } from 'react'

export type MidiSyncClientContextType = MidiSyncServiceClient | null
export const MidiSyncClientContext = createContext<MidiSyncClientContextType>(null)

export const useMidiSyncClient = () => {
  return useContext(MidiSyncClientContext)
}

export const useAnimateMidiPlayback = () => {
  const midiSyncClient = useMidiSyncClient()
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
    const startTime = new Date(serverTime + startDelayMs) // new Date(serverTime + startDelayMs)
    playbackStartTime.current = startTime
  }, [])

  const onStopTrigger = useCallback(() => {
    playbackStartTime.current = undefined
  }, [])

  const onSync = useCallback(({startTime}: {startTime: number}) => {
    playbackStartTime.current = new Date(startTime)
  }, [])

  useEffect(() => {
    const listener = midiSyncClient ? midiSyncClient.on('startPlayback', onPlaybackTrigger) : undefined
    return () => {
      listener?.dispose()
    }
  }, [midiSyncClient, onPlaybackTrigger])

  useEffect(() => {
    const listener = midiSyncClient ? midiSyncClient.on('stopPlayback', onStopTrigger) : undefined
    return () => {
      listener?.dispose()
    }
  }, [midiSyncClient, onStopTrigger])

  useEffect(() => {
    const listener = midiSyncClient ? midiSyncClient.on('syncPlayback', onSync) : undefined
    return () => {
      listener?.dispose()
    }
  })

  return playbackTime
}
