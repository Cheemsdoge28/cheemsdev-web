import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../env";

// Server-side client with write permissions
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for write operations
  token: process.env.SANITY_API_WRITE_TOKEN, // Write token
  perspective: "published",
});

// Read-only client (existing functionality)
export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN, // Read token
  perspective: "published",
});
