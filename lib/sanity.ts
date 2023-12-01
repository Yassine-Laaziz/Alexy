import imageUrlBuilder from '@sanity/image-url'
import { createClient } from '@sanity/client'

export async function sanityFetch(query: string) {
  const req = await fetch(`https://ylkdw7rx.api.sanity.io/v2022-12-28/data/query/production?query=${encodeURIComponent(query)}`, {
    next: { tags: ['sanity'] },
  })

  const response = (await req?.json())?.result
  return response
}

export const autoClient = createClient({
  projectId: 'ylkdw7rx',
  dataset: 'production',
  apiVersion: '2023-11-17',
  token: process.env.SANITY_TOKEN,
  useCdn: true,
})

const builder = imageUrlBuilder(autoClient)
export const urlFor = (sanitySrc: object) => builder.image(sanitySrc)
