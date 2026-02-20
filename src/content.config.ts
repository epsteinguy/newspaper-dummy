import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const defaultImageUrl = "https://placehold.co/600x500.png"; // when image missing somehow

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    properties: z.object({
      Name: z.string(),
      Description: z.string(),
      Image: z.string().url().default(defaultImageUrl),
      ImageAlt: z.string().default(""),
      Date: z.coerce.date().optional().nullable(),
      Published: z.boolean().default(true),
      Slug: z.string().regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase, alphanumeric, and kebab-case"
      ),
      Authors: z.array(z.string()),
      Tags: z.array(z.string()),
    }),
  }),
});

export const collections = { posts };
