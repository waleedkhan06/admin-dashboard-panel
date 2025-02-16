import imageUrlBuilder from "@sanity/image-url";
import { createClient, type SanityClient } from "@sanity/client";
import type { Image } from "sanity"; // Import Sanity Image type

// ✅ Initialize Sanity client
export const client: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

// ✅ Setup Image URL Builder
const builder = imageUrlBuilder(client);

// ✅ Function to generate a URL from an image reference
export function urlFor(source: Image) {
  return builder.image(source).url();
}
