import { WebSocketService } from '@sidewinder/server'
import { MidiSyncServiceContract } from '@dotdot/services/midi-sync/contract'

export class MidiSyncService extends WebSocketService<typeof MidiSyncServiceContract> {
  midiStartTime = 0
  constructor(){
    super(MidiSyncServiceContract)
  }
  // -------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------
  /** Returns the current sync state */
  public onGetSyncState = this.method('getSyncState', () => {
    const currentTime = Date.now()
    const syncTime = this.midiStartTime ? currentTime - this.midiStartTime : 0
    return {
      serverTime: currentTime,
      syncTime,
    }
  })

  public onStartPlayback = this.method('startPlayback', (identity, request) => {
    if (this.midiStartTime > 0 && !request.restart) {
      return false
    }

    const currentTime = Date.now()
    for (const client in this.clients) {
      this.send(client, 'startPlayback', {
        serverTime: currentTime,
        startDelayMs: request.startDelayMs,
      })
    }
    return true
  })
  
  public onStopPlayback = this.method('stopPlayback', () => {
    for (const client in this.clients) {
      this.send(client, 'stopPlayback')
    }
  })

  // -------------------------------------------------------------------
  // Events
  // -------------------------------------------------------------------
  public onAuthorize = this.event('authorize', async (socketId, request) => {
    return socketId
  })
}
