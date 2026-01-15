import * as Koa from "koa"
import compose from "koa-compose"
import { authenticateBearer, getBodyValidator } from "../../utils/middleware"
import { IUpdateRestaurantStatus } from "../restaurant.common"
import { restaurantStatusSchema } from "../restaurant.validation"
import { updateRestaurantStatus } from "../restaurants.service"

const controller: Koa.Middleware = async (ctx, _next) => {
  const payload = ctx.request.body as IUpdateRestaurantStatus
  const { username } = ctx["user"]
  const result = await updateRestaurantStatus(payload, username)
  ctx.body = {
    success: true,
    data: result
  }
}

export const pipeline = compose([
  authenticateBearer,
  getBodyValidator(restaurantStatusSchema),
  controller
])
