import type { ClientOptions } from '@irc/client'

const irc = {
  hostname: Deno.env.get('IRC_HOSTNAME')!,
  port: Number(Deno.env.get('IRC_PORT')!) || 6667,

  client: {
    nick: Deno.env.get('IRC_NICK')!,
    username: Deno.env.get('IRC_USERNAME'),
    password: Deno.env.get('IRC_PASSWORD'),
    realname: Deno.env.get('IRC_REALNAME'),
    channels: Deno.env.get('IRC_CHANNELS')?.split(',') as ClientOptions['channels'] | undefined,
    pingTimeout: false,
    verbose: Deno.env.get('DEBUG') ? 'raw' : undefined,
  } satisfies ClientOptions,
}

const convex = {
  url: Deno.env.get('CONVEX_URL')!,
  apiKey: Deno.env.get('CONVEX_TOKEN')!,
  imageURL: Deno.env.get('CONVEX_IMAGE_URL')!,
  imageCollection: Deno.env.get('CONVEX_IMAGE_COLLECTION')!,
}

export const config = {
  irc,
  convex,
}

export type Config = typeof config
