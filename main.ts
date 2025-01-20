import { config, type Config } from './config.ts'
import { Core } from './core.ts'
import { IRCService } from './services/irc.ts'
import { logger } from './services/logger.ts'
import monitorPlugin from './plugins/monitor.ts'
import weatherPlugin from './plugins/weather.ts'
import textToImagePlugin from './plugins/text-to-image/mod.ts'

globalThis.addEventListener('unhandledrejection', (e) => {
  console.error('[[unhandled rejection]] ', e.reason)
  e.preventDefault()
})


function main(config: Config) {
  const irc = new IRCService(config.irc.client)
  const core = new Core({ irc, logger }, config)

  core.loadPlugin(monitorPlugin)
  core.loadPlugin(weatherPlugin)
  core.loadPlugin(textToImagePlugin)
  core.connect()
}

main(config)
