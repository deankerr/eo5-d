import { newQueue } from 'jsr:@henrygd/queue'

import { createPlugin } from '../../plugin.ts'
import type { IRCMessageEvent } from '../../services/irc.ts'
import { loadRegistry } from './registry.ts'
import { textToImage } from './text-to-image.ts'

const registryPath = './data/text-to-image.toml'

function splitFirstWord(input: string): { first: string; rest: string } {
  const matches = input.trim().match(/^(\S+)(?:\s+(.*))?$/)

  if (!matches) {
    return { first: '', rest: '' } // handles empty string case
  }

  return {
    first: matches[1],
    rest: matches[2] || '',
  }
}

export type ParsedMessageEvent = NonNullable<ReturnType<typeof parseMessageEvent>>
function parseMessageEvent({ source, params }: Omit<IRCMessageEvent, 'event'>) {
  if (!source?.mask) return
  const input = splitFirstWord(params.text)
  return {
    source: {
      name: source.name,
      ...source.mask,
    },
    target: params.target,
    text: params.text,
    command: input.first,
    query: input.rest,
  }
}

const textToImagePlugin = createPlugin('text-to-image')({
  load: (services) => {
    const { irc, logger } = services
    const { registry, errors } = loadRegistry(registryPath)

    for (const { issues, entry } of errors) {
      logger.error`registry error: \n${{ issues }}\n${{ entry }}`
    }

    logger.info`registry: ${registry.size}`

    const queue = newQueue(2)

    irc.client.on('privmsg:channel', (payload) => {
      const parsed = parseMessageEvent(payload)
      if (!parsed) return

      if (parsed.command === '@list') {
        irc.client.privmsg(parsed.target, [...registry.keys()].join(' '))
        return
      }

      const entry = registry.get(parsed.command)
      if (entry) {
        logger.info`${entry}`
        queue.add(async () => await textToImage(services, parsed, entry))
      }
    })
  },
})

export default textToImagePlugin
