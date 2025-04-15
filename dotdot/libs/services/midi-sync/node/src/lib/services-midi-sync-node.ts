import { WebSocketService } from '@sidewinder/server'
import { MidiSyncServiceContract } from '@dotdot/services-midi-sync-contract'

export class MidiSyncService extends WebSocketService<typeof MidiSyncServiceContract> {
  #midiStartTime = 0
  #listeners: Set<string> = new Set()
  constructor(){
    super(MidiSyncServiceContract)
  }
  // -------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------
  /** Returns the current sync state */
  public onGetSyncState = this.method('getSyncState', () => {
    const currentTime = Date.now()
    const syncTime = this.#midiStartTime ? currentTime - this.#midiStartTime : 0
    return {
      serverTime: currentTime,
      syncTime,
    }
  })

  public onStartPlayback = this.method('startPlayback', (identity, request) => {
    if (this.#midiStartTime > 0 && !request.restart) {
      console.log('[Midi Sync Service] Received playback trigger while playing - ignoring')
      return false
    }

    const currentTime = Date.now()
    this.#midiStartTime = currentTime
    console.log('[Midi Sync Service] Sending playback trigger')
    for (const socketId of this.#listeners) {
      console.log('[Midi Sync Service] Sending playback trigger to ' , socketId)
      this.send(socketId, 'startPlayback', {
        serverTime: currentTime,
        startDelayMs: request.startDelayMs,
      })
    }
    return true
  })
  
  public onStopPlayback = this.method('stopPlayback', () => {
    console.log('[Midi Sync Service] Stopping playback')
    this.#midiStartTime = 0
    for (const socketId of this.#listeners) {
      console.log('[Midi Sync Service] Sending stop trigger to: ', socketId)
      this.send(socketId, 'stopPlayback')
    }
  })

  // -------------------------------------------------------------------
  // Events
  // -------------------------------------------------------------------
  public onAuthorize = this.event('authorize', async (socketId, request) => {
    console.log('[Midi Sync Service] Authorized client: ', socketId)
    return socketId
  })

  public onConnected = this.event('connect', (socketId) => {
    console.log('[Midi Sync Service] Adding listener: ', socketId)
    this.#listeners.add(socketId)
  })

  public onDisconnected = this.event('close', (socketId) => {
    this.#listeners.delete(socketId)
  })
}
