import * as toml from 'jsr:@std/toml'
import { z } from 'npm:zod'

export type RegistryEntry = z.infer<typeof registryEntrySchema>

const registryEntrySchema = z.object({
  command: z.string(),
  pre_prompt: z.string().optional(),
  post_prompt: z.string().optional(),
  modelId: z.string(),
  loras: z
    .array(z.union([z.tuple([z.string()]), z.tuple([z.string(), z.number()])]))
    .transform((l) =>
      l.map(([path, scale]) => ({ path: z.string().parse(path), scale: z.number().optional().parse(scale) })),
    )
    .optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  link: z.string().optional(),
})

const registrySchema = z.object({ registry: z.unknown().array() })

export function loadRegistry(path: string) {
  const { registry: data } = registrySchema.parse(toml.parse(Deno.readTextFileSync(path)))

  const registry = new Map<string, RegistryEntry>()
  const errors: { entry: unknown; issues: unknown }[] = []

  for (const entry of data) {
    const parsed = registryEntrySchema.safeParse(entry)
    if (parsed.success) {
      registry.set(parsed.data.command, parsed.data)
      continue
    }

    errors.push({ entry, issues: parsed.error.flatten().fieldErrors })
  }

  return { registry, errors }
}
