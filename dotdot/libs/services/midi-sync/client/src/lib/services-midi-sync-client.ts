import { MidiSyncServiceContract, StartPlaybackTriggerRequest, StopPlaybackRequest } from '@dotdot/services/midi-sync/contract'
import {WebSocketClient} from '@sidewinder/client'
import {EventHandler, EventListener, Events} from '@sidewinder/events'

export class MidiSyncServiceClient {
  private readonly client: WebSocketClient<typeof MidiSyncServiceContract>
  private readonly events: Events

  constructor(endpoint: string){
    this.client = new WebSocketClient(MidiSyncServiceContract, endpoint)
    this.events = new Events()
    this.client.method('startPlayback', (event) => this.events.send('startPlayback', event))
    this.client.method('stopPlayback', (event) => this.events.send('stopPlayback', event))
  }

  public triggerStart = async (startDelayMs: number, restart?: boolean) => {
    if (restart) {
      await this.client.call('startPlayback', {
        startDelayMs,
        restart
      })  
    } else {
      await this.client.call('startPlayback', {
        startDelayMs
      })
    }
  }

  public triggerStop = async () => {
    await this.client.call('stopPlayback')
  }

  public on(event: 'stopPlayback', handler: EventHandler<StopPlaybackRequest>): EventListener
  public on(event: 'startPlayback', handler: EventHandler<StartPlaybackTriggerRequest>): EventListener 
  public on(event: string, handler: EventHandler<any>): EventListener {
    return this.events.on(event, handler)
  }
}