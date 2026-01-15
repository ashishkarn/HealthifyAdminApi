import Koa from "koa"
import bodyParser from "koa-bodyparser"
import Router from "@koa/router"
import { globalErrorHandler } from "./utils/middleware"
import { router as restaurantsRouter } from "./restaurant/api/restaurants.router"
import { router as authRouter } from "./auth/api/auth.router"
import cors from "@koa/cors"

export const app = new Koa()

const router = new Router()
router.use("/restaurants", restaurantsRouter.routes())
router.use("/authenticate", authRouter.routes())

app.use(
  cors({
    origin: "*"
  })
)
app.use(globalErrorHandler)
app.use(bodyParser())
app.use(router.routes())
