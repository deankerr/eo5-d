import { newQueue, Queue } from 'jsr:@henrygd/queue'
import type { Services } from '../core.ts'
import type { IRCMessageEvent } from '../services/irc.ts'
import { createPlugin } from '../plugin.ts'

const key = Deno.env.get('WEATHER_API_KEY')

async function getWeather(query: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${Deno.env.get(
        'WEATHER_API_KEY',
      )!}&q=${encodeURIComponent(query)}&days=1`,
    )
    const json = await response.json()

    const location = [json.location.name, json.location.region, json.location.country]
      .filter(Boolean)
      .join(', ')

    const reply: string[] = [
      `Weather for ${location}: ${json.current.condition.text}, ${json.current.temp_c}°C (feels like ${json.current.feelslike_c}°C).`,
    ]

    // deno-lint-ignore no-explicit-any
    const forecastDays: any[] = json.forecast.forecastday
    const forecast = forecastDays.map(
      ({ day }) => `${day.condition.text} min: ${day.mintemp_c}°C, max: ${day.maxtemp_c}°C`,
    )

    if (forecast.length > 0) {
      reply.push('Forecast:', forecast.join(', '))
    }

    return reply.join(' ')
  } catch (err) {
    console.error(err)
    return 'Error getting weather'
  }
}

function parseCommand(command: string, text: string) {
  const trimmed = text.trim()
  if (!trimmed.startsWith(command)) return
  return { command, text: trimmed.slice(command.length).trim() }
}

function createCommandHandler({ irc }: Services, queue: Queue, command: string) {
  return ({ source, params }: Omit<IRCMessageEvent, 'event'>) => {
    const parsed = parseCommand(command, params.text)
    if (!source || !parsed) return

    queue.add(async () => {
      const weather = await getWeather(parsed.text)
      irc.client.privmsg(params.target, weather)
    })
  }
}

const weatherPlugin = createPlugin('weather')({
  load: (services) => {
    const { irc, logger } = services
    if (!key) {
      logger.error`Weather API key not found`
      return
    }

    const queue = newQueue(1)
    const handler = createCommandHandler(services, queue, '@weather')

    irc.client.on('privmsg:channel', handler)
  },
})

export default weatherPlugin
