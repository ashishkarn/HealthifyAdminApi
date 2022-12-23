import * as Koa from "koa"
import * as compose from "koa-compose"
import { findByPlaceId } from "../restaurants.service"
import * as R from "ramda"
import { HttpError } from "../../utils/utils"

const controller: Koa.Middleware = async (ctx, next) => {
  const params = ctx.params
  const result = await findByPlaceId(params.restaurantName)
  if (R.isNil(result)) {
    throw new HttpError("Restaurant not found", 400)
  }
  ctx.body = {
    success: true,
    message: "Fetched restaurant",
    data: result
  }
}

export const pipeline = compose([controller])
