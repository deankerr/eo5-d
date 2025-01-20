import type { ParsedMessageEvent } from './mod.ts'
import type { RegistryEntry } from './registry.ts'
import type { Services } from '../../core.ts'
import { api } from '../../services/convex-api.ts'
import type { ConvexService, ESuiteImage } from '../../services/convex.ts'
import { ms } from 'npm:itty-time'

export async function textToImage(services: Services, event: ParsedMessageEvent, entry: RegistryEntry) {
  const { irc, logger, convex } = services

  const input = buildInputParams(entry, event.query)
  logger.info`${entry.command} ${input.prompt}`

  const { generationIds } = await convex.client.mutation(api.entities.generations.public.create, {
    inputs: [input],
    apiKey: convex.config.apiKey,
  })

  const generationId = generationIds[0]
  const result = await getGenerationResult(convex, generationId)

  if (result.success) {
    const url = `${convex.config.imageURL}/${result.image.xid}.png`
    irc.client.privmsg(event.target, url)

    await addImageToCollection(convex, result.image)
    await addImageMetadata(convex, result.image, event.source?.name ?? '', event.text)
  } else {
    logger.error`error: ${result.error}`
    irc.client.privmsg(event.target, `Error: ${result.error}`)
  }
}

function buildInputParams(params: RegistryEntry, text: string) {
  const prompt = [params.pre_prompt, text.trim(), params.post_prompt].filter(Boolean).join(' ')

  const size =
    params.width && params.height
      ? { width: params.width, height: params.height }
      : { workflow: 'generate_dimensions' }

  return {
    prompt,
    modelId: params.modelId,
    loras: params.loras,
    n: 1,
    type: 'textToImage' as const,
    ...size,
  }
}

type GenerationResult =
  | {
      success: true
      image: ESuiteImage
    }
  | {
      success: false
      error: string
    }

function getGenerationResult(
  convex: ConvexService,
  generationId: string,
  timeoutMs: number = ms('2 minutes'),
): Promise<GenerationResult> {
  return new Promise((resolve, reject) => {
    // Set timeout to avoid hanging forever
    const timeout = setTimeout(() => {
      watch.unsubscribe()
      reject(new Error('Generation timed out'))
    }, timeoutMs)

    const watch = convex.client.onUpdate(
      api.entities.generations.public.get,
      { generationId, apiKey: convex.config.apiKey },
      (generation) => {
        if (!generation) return

        // image is ready
        const image = generation?.images?.[0]
        if (image) {
          clearTimeout(timeout)
          watch.unsubscribe()
          resolve({ success: true, image })
          return
        }

        // generation failed
        if (generation.status === 'failed') {
          clearTimeout(timeout)
          watch.unsubscribe()
          resolve({ success: false, error: 'Failed to generate image' })
          return
        }
      },
    )
  })
}

// add the image to the collection
async function addImageToCollection(convex: ConvexService, image: ESuiteImage) {
  await convex.client.mutation(api.entities.collections.public.update, {
    collectionId: convex.config.imageCollection,
    images_v2: {
      add: [image._id],
    },
    apiKey: convex.config.apiKey,
  })
}

// add user/prompt metadata
async function addImageMetadata(convex: ConvexService, image: ESuiteImage, name: string, text: string) {
  await convex.client.mutation(api.entities.imagesMetadata.public.add, {
    imageId: image._id,
    fields: {
      type: 'message',
      role: 'user',
      name,
      text,
    },
    apiKey: convex.config.apiKey,
  })
}
