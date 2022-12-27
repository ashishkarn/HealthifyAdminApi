import * as Koa from "koa"
import * as bodyParser from "koa-bodyparser"
import * as Router from "koa-router"
import { globalErrorHandler } from "./utils/middleware"
import { router as restaurantsRouter } from "./restaurant/api/restaurants.router"
import { router as authRouter } from "./auth/api/auth.router"
import * as cors from "@koa/cors"

export const app = new Koa()

const router = new Router()
router.use("/restaurants", restaurantsRouter.routes())
router.use("/authenticate", authRouter.routes())

app.use(
  cors({
    origin: "*"
  })
)
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  await next()
})
app.use(globalErrorHandler)
app.use(bodyParser())
app.use(router.routes())
