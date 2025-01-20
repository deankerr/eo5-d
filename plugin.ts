import type { Core, Services } from './core.ts'

export interface Plugin {
  name: string
  load: (services: Services, options: Core['options']) => void
}

export function createPlugin(name: string) {
  return (fns: { load: Plugin['load'] }): Plugin => ({ name, ...fns })
}
