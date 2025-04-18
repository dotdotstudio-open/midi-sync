import { ReactNode, useCallback, useEffect, useState } from "react"
import {MidiData, parseMidi} from 'midi-file'
import { MidiDataContext } from "./midi-data-context"

export type MidiDataProviderProps = {
  midiFileUrl: string
  children: ReactNode
}

export const MidiDataProvider = ({
  midiFileUrl,
  children,
}: MidiDataProviderProps) => {
  const [midi, setMidi] = useState<MidiData>()
  
  const loadMidi = useCallback(async (url: string) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`)
      }
      const content = await response.arrayBuffer()
      const parsed = parseMidi(new Uint8Array(content))
      setMidi(parsed)
      console.log('[Midi File Reader] Parsed midi: ', parsed)
    } catch (error) {
      console.warn('[Midi File Reader] Failed to load file. ', error)
    }
  }, [])

  useEffect(() => {
    loadMidi(midiFileUrl)
  }, [loadMidi, midiFileUrl])
  
  return (
    <MidiDataContext.Provider value={midi}>
      {children}
    </MidiDataContext.Provider>
  )
}