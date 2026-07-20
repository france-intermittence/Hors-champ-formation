import { z } from "zod";

export const leadSchema = z.object({
  lastname: z.string().trim().min(1).max(200),
  firstname: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  profile: z.string().trim().max(200).optional().or(z.literal("")),
  formation: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
  consent: z.union([z.literal("on"), z.literal("true"), z.boolean()]),
  // Champ honeypot : doit rester vide. Les vrais visiteurs ne le voient/remplissent jamais.
  website: z.string().max(200).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
