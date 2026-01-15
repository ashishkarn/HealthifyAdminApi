import Router from "@koa/router"
import { pipeline as authenticateWithUsernamePass } from "./login-by-user-pass"

export const router = new Router()

router.post("/userAndPass", authenticateWithUsernamePass)
