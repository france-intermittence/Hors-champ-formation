import { z } from "zod";

export const postSectionSchema = z.object({
  id: z.string().trim().min(1),
  heading: z.string().trim().min(1),
  body: z.array(z.string().trim().min(1)).min(1),
});

export const postSourceSchema = z.object({
  title: z.string().trim().min(1),
  publisher: z.string().trim().min(1),
  url: z.string().trim().url(),
});

export const postSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug invalide (minuscules, chiffres, tirets)"),
  title: z.string().trim().min(1).max(300),
  excerpt: z.string().trim().min(1).max(500),
  category: z.string().trim().min(1),
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, "Date au format AAAA-MM-JJ"),
  readingTime: z.string().trim().min(1).max(20),
  author: z.string().trim().min(1).max(200),
  image: z.string().trim().max(500).optional().or(z.literal("")),
  featured: z.boolean().optional().default(false),
  relatedFormationSlug: z.string().trim().max(200).optional().or(z.literal("")),
  intro: z.string().trim().min(1),
  sections: z.array(postSectionSchema).min(1),
  callout: z
    .object({ title: z.string().trim().min(1), body: z.string().trim().min(1) })
    .optional(),
  sources: z.array(postSourceSchema).optional(),
});

export type PostInput = z.infer<typeof postSchema>;
