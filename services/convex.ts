import { ConvexClient } from 'convex/browser'
import type { Config } from '../config.ts'
import type { PublicApiType } from './convex-api.ts'

export class ConvexService {
  client: ConvexClient
  config: Config['convex']

  constructor(config: Config) {
    this.config = config.convex
    this.client = new ConvexClient(config.convex.url)
  }
}

export type ESuiteImage = PublicApiType['entities']['images']['public']['getByRunId']['_returnType'][number]
