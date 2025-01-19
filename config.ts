import type { ClientOptions } from '@irc/client'

const irc = {
  hostname: Deno.env.get('IRC_HOSTNAME')!,
  client: {
    nick: Deno.env.get('IRC_NICK')!,
    username: Deno.env.get('IRC_USERNAME'),
    realname: Deno.env.get('IRC_REALNAME'),
    channels: Deno.env.get('IRC_CHANNELS')?.split(',') as ClientOptions['channels'] | undefined,
    pingTimeout: false,
  } satisfies ClientOptions,
}

export const config = {
  irc,
}

export type Config = typeof config
