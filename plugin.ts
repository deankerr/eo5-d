import type { Logger } from '@logtape/logtape'
import type { Core } from './core.ts'
import type { IRCService } from './irc.ts'

type Services = {
  irc: IRCService
  logger: Logger
}

export interface Plugin {
  name: string
  load: (services: Services, options: Core['options']) => void
}

export function createPlugin(name: string) {
  return (fns: { load: Plugin['load'] }): Plugin => ({ name, ...fns })
}
