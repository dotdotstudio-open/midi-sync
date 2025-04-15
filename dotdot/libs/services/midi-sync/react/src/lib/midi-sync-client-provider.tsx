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
    const newClient = new MidiSyncServiceClient(endpoint)
    setClient(newClient)
  }, [endpoint])

  return (
    <MidiSyncClientContext.Provider value={client}>
      {children}
    </MidiSyncClientContext.Provider>
  )
}
