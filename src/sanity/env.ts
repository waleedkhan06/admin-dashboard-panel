export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-04'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const apiToken = assertValue(
  "skYg1Q5ISTxGktwvVIGpuw0KZq3RZrVaiQNHmMpMTP1Jvcr83YfYVFNVuBIzcb1wHzpa3UoQdiWp5Aa1fmAq5u9XEiogxvFEWXy6BlX0X57RctZtpgdQyMmgANktE8QzoyCWDxZBUxTS964yorW3bw1lRhSNG3DqJWUGbrDGFTTvEJnEKGXR",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
