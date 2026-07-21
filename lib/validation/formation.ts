import { z } from "zod";

export const formationSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug invalide (minuscules, chiffres, tirets)"),
  title: z.string().trim().min(1).max(300),
  category: z.enum(["Formation principale", "Parcours expert", "Module d'entrée"]),
  tag: z.string().trim().max(100).optional().or(z.literal("")),
  excerpt: z.string().trim().min(1).max(500),
  subtitle: z.string().trim().min(1).max(500),
  intro: z.string().trim().min(1),
  duration: z.string().trim().min(1).max(50),
  durationDays: z.number().int().positive(),
  price: z.number().int().positive().optional(),
  level: z.enum(["Débutant", "Débutant à intermédiaire", "Intermédiaire", "Tous niveaux"]),
  format: z.string().trim().min(1).max(100),
  location: z.string().trim().min(1).max(200),
  place: z.string().trim().max(300).optional().or(z.literal("")),
  rhythm: z.string().trim().min(1).max(200),
  accessDelay: z.string().trim().min(1).max(300),
  accessibility: z.string().trim().min(1),
  featured: z.boolean().optional().default(false),
  objectives: z.array(z.string().trim().min(1)).min(1),
  content: z.array(z.string().trim().min(1)).min(1),
  methods: z.array(z.string().trim().min(1)).min(1),
  evaluation: z.array(z.string().trim().min(1)).min(1),
  image: z.string().trim().max(500).optional().or(z.literal("")),
  imageAlt: z.string().trim().max(300).optional().or(z.literal("")),
  programPdfUrl: z.string().trim().max(500).optional().or(z.literal("")),
  programPdfName: z.string().trim().max(300).optional().or(z.literal("")),
});

export type FormationInput = z.infer<typeof formationSchema>;
