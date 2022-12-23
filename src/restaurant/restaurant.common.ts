import * as z from "zod"
import { restaurantStatusSchema } from "./restaurant.validation"

export type IUpdateRestaurantStatus = z.infer<typeof restaurantStatusSchema>
