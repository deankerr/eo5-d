import type { Logger } from 'jsr:@logtape/logtape'
import type { Config } from './config.ts'
import type { IRCService } from './irc.ts'
import type { Plugin } from './plugin.ts'

export type Services = {
  irc: IRCService
  logger: Logger
}

export class Core {
  private plugins: Map<string, Plugin> = new Map()
  private log: Logger
  irc: IRCService
  logger: Logger
  options: Config

  constructor({ irc, logger }: { irc: IRCService; logger: Logger }, config: Config) {
    this.options = config
    this.irc = irc
    this.logger = logger
    this.log = logger.getChild('core')
  }

  loadPlugin(plugin: Plugin, name = plugin.name) {
    if (this.plugins.has(name)) throw new Error('plugin already loaded')

    this.plugins.set(name, plugin)
    plugin.load({ irc: this.irc, logger: this.logger.getChild(name) }, this.options)

    this.log.info`load: ${name}`
  }

  connect() {
    const { hostname } = this.options.irc
    this.irc.client.connect(hostname)
  }
}
