import * as Koa from "koa"
import * as compose from "koa-compose"
import { authenticateBearer } from "../../utils/middleware"
import { findWorkloadRestaurants } from "../restaurants.service"

const controller: Koa.Middleware = async (ctx, next) => {
  const { limit, skip } = ctx.user
  const result = await findWorkloadRestaurants(limit, skip)
  ctx.body = {
    success: true,
    message: "Fetched restaurants, Count: " + result.length,
    data: result
  }
}

export const pipeline = compose([authenticateBearer, controller])
