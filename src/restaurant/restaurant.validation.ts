import * as z from "zod"

export const restaurantStatusSchema = z.object({
  placeId: z.string(),
  madeContact: z.boolean().optional(),
  isActive: z.boolean().optional(),
  websiteWorks: z.boolean().optional(),
  phoneWorks: z.boolean().optional(),
  deliveryPossible: z.boolean().optional(),
  safeDelivery: z.boolean().optional(),
  healthyStatus: z
    .object({
      glutenFree: z.enum(["YES", "NO", "PARTIAL", "NOT_SURE"]),
      vegetarian: z.enum(["YES", "NO", "PARTIAL", "NOT_SURE"]),
      keto: z.enum(["YES", "NO", "PARTIAL"])
    })
    .optional()
})
