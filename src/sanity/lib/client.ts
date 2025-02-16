import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, apiToken } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: apiToken,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
