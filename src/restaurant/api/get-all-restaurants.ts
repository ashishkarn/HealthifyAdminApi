import * as Koa from "koa"
import compose from "koa-compose"
import { findAll as findAllRestaurants } from "../restaurants.service"

const controller: Koa.Middleware = async (ctx, _next) => {
  const result = await findAllRestaurants()
  ctx.body = {
    success: true,
    message: "Fetched restaurants, Count: " + result.length,
    data: result
  }
}

export const pipeline = compose([controller])
