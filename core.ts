import type { Logger } from './services/logger.ts'
import type { Config } from './config.ts'
import type { IRCService } from './services/irc.ts'
import type { Plugin } from './plugin.ts'
import { ConvexService } from './services/convex.ts'

export type Services = {
  irc: IRCService
  logger: Logger
  convex: ConvexService
}

export class Core {
  options: Config
  private plugins: Map<string, Plugin> = new Map()
  private log: Logger
  irc: IRCService
  logger: Logger
  convex: ConvexService

  constructor({ irc, logger }: { irc: IRCService; logger: Logger }, config: Config) {
    this.options = config
    this.irc = irc
    this.logger = logger
    this.log = logger.getChild('core')
    this.convex = new ConvexService(config)
  }

  loadPlugin(plugin: Plugin, name = plugin.name) {
    if (this.plugins.has(name)) throw new Error('plugin already loaded')

    this.plugins.set(name, plugin)
    plugin.load({ irc: this.irc, logger: this.logger.getChild(name), convex: this.convex }, this.options)

    this.log.info`load: ${name}`
  }

  connect() {
    const { hostname } = this.options.irc
    this.irc.client.connect(hostname)
  }
}
