import { MidiData } from "midi-file"
import { createContext, useContext } from "react"

export type MidiDataContextType = MidiData | undefined

export const MidiDataContext = createContext<MidiDataContextType>(undefined)

export const useMidiData = () => {
  return useContext(MidiDataContext)
}