import { config, type Config } from './config.ts'
import { Core } from './core.ts'
import { IRCService } from './irc.ts'
import { logger } from './logger.ts'
import monitorPlugin from './plugins/monitor.ts'
import weatherPlugin from './plugins/weather.ts'

function main(config: Config) {
  const irc = new IRCService(config.irc.client)
  const core = new Core({ irc, logger }, config)

  core.loadPlugin(monitorPlugin)
  core.loadPlugin(weatherPlugin)
  core.connect()
}

main(config)
