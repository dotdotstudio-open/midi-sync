import { ReactNode, useEffect, useState } from "react"
import { MidiSyncClientContext, MidiSyncClientContextType } from "./midi-sync-client-context"
import { MidiSyncServiceClient } from "@dotdot/services-midi-sync-client"

export type MidiSyncClientProviderProps = {
  endpoint: string
  children: ReactNode
}

export const MidiSyncClientProvider = ({
  endpoint,
  children,
}: MidiSyncClientProviderProps) => {
  const [client, setClient] = useState<MidiSyncClientContextType>(null)

  useEffect(() => {
    console.log('[Midi Sync Client Provider] Creating new client at endpoint: ', endpoint)
    const newClient = new MidiSyncServiceClient(endpoint)
    setClient(newClient)
    console.log('[Midi Sync Client Provider] Created and set new client')
    return () => {
      console.log('[Midi Sync Client Provider] Disposing of client')
      newClient.dispose()
    }
  }, [endpoint])

  useEffect(() => {
    const intervalId = client ? setInterval(client.sync, 250) : undefined

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [client])

  return (
    <MidiSyncClientContext.Provider value={client}>
      {children}
    </MidiSyncClientContext.Provider>
  )
}
