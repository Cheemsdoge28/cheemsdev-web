"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import {media} from 'sanity-plugin-media'
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { resolve } from "@/sanity/presentation/resolve";
import { structure } from "./sanity/structure";
import { colorInput } from "@sanity/color-input";
import { customDocumentActions } from "./plugins/customDocumentActions";
import { assist } from "@sanity/assist";
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";
import { embeddingsIndexDashboard } from "@sanity/embeddings-index-ui";
import { HEADER_NAME } from "./lib/constants";
export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  name: HEADER_NAME,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,  plugins: [
    assist(),
    imageHotspotArrayPlugin(),
    structureTool({ structure }),
    customDocumentActions(),
    colorInput(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve,
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
    embeddingsIndexDashboard(),
  ],
});
