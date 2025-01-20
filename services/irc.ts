import { Client, type ClientOptions } from '@irc/client'

export class IRCService {
  private _client: Client
  proxy: Client

  constructor(config: ClientOptions) {
    this._client = new Client(config)
    this._client.on('error', (data) => console.error('[error]', data))

    // Create a proxy to intercept all client method calls
    this.proxy = new Proxy(this._client, {
      get: (target, prop, receiver) => {
        const original = Reflect.get(target, prop, receiver)
        if (typeof original !== 'function') return original

        return (...args: unknown[]) => {
          // apply text filter to all string arguments
          const filteredArgs = args.map((arg) => (typeof arg === 'string' ? defaultTextFilter(arg) : arg))
          return original.apply(target, filteredArgs)
        }
      },
    })
  }

  get client() {
    return this.proxy
  }
}

function defaultTextFilter(text: string) {
  // limit max output length
  const output = text.slice(0, 480)
  return output
}

type Source = {
  name: string
  mask?: { user: string; host: string }
}

// message events
export type IRCPrivmsgEvent = { event: 'privmsg'; source?: Source; params: { target: string; text: string } }
export type IRCActionEvent = { event: 'action'; source?: Source; params: { target: string; text: string } }
export type IRCNoticeEvent = { event: 'notice'; source?: Source; params: { target: string; text: string } }

// channel events
export type IRCJoinEvent = { event: 'join'; source?: Source; params: { channel: string } }
export type IRCPartEvent = { event: 'part'; source?: Source; params: { channel: string; comment?: string } }
export type IRCKickEvent = {
  event: 'kick'
  source?: Source
  params: { channel: string; nick: string; comment?: string }
}
export type IRCKillEvent = { event: 'kill'; source?: Source; params: { nick: string; comment?: string } }
export type IRCNickEvent = { event: 'nick'; source?: Source; params: { nick: string } }
export type IRCQuitEvent = { event: 'quit'; source?: Source; params: { comment?: string } }

export type IRCEvents =
  | IRCPrivmsgEvent
  | IRCActionEvent
  | IRCNoticeEvent
  | IRCJoinEvent
  | IRCPartEvent
  | IRCKickEvent
  | IRCKillEvent
  | IRCNickEvent
  | IRCQuitEvent
type IRCEvent<T extends string> = Extract<IRCEvents, { event: T }>

export type IRCMessageEvent = IRCEvent<'privmsg' | 'action' | 'notice'>
