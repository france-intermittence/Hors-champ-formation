import { z } from "zod";

export const analyticsEventSchema = z.object({
  type: z.enum(["page_view", "click"]),
  path: z.string().trim().min(1).max(500),
  label: z.string().trim().max(200).optional(),
  referrer: z.string().trim().max(500).optional(),
  sessionId: z.string().trim().max(100).optional(),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
