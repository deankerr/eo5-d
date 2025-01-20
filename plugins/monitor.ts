import { createPlugin } from '../plugin.ts'

const monitorPlugin = createPlugin('monitor')({
  load: ({ irc, logger: log }) => {
    irc.client.on('connected', (payload) => {
      log.info`connected: ${payload}`
    })

    irc.client.on('connecting', (payload) => {
      log.info`connecting: ${payload}`
    })

    irc.client.on('disconnected', (payload) => {
      log.info`disconnected: ${payload}`
    })

    irc.client.on('reconnecting', (payload) => {
      log.info`reconnecting: ${payload}`
    })

    irc.client.on('register', ({ source, params }) => {
      log.info`registered: ${params.nick} on ${source?.name}`
    })

    irc.client.on('join', ({ source, params }) => {
      if (source?.name === irc.client.state.user.nick) {
        log.info`joined: ${params.channel}`
      }
    })

    irc.client.on('notice', ({ source, params }) => {
      log.info`notice: ${params.target} ${source?.name} ${params.text}`
    })

    irc.client.on('privmsg', ({ source, params }) => {
      log.info`privmsg: ${params.target} ${source?.name} ${params.text}`
    })
  },
})

export default monitorPlugin
