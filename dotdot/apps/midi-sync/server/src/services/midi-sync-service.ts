
// --------------------------------------------------------------------------
// Service Types
// --------------------------------------------------------------------------
import { MidiSyncService } from '@dotdot/services/midi-sync/node'

// --------------------------------------------------------------------------
// Midi Sync Service
// --------------------------------------------------------------------------
export async function resolveMidiSyncService() {
  return new MidiSyncService()
}
