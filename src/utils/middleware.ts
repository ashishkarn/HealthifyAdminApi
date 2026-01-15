import * as Koa from "koa"
import * as R from "ramda"
import * as z from "zod"
import { HttpError } from "./utils"
import * as jwt from "jsonwebtoken"
import { getSettings } from "../config"
import { findUserByUsername } from "../auth/auth.service"
import { logger } from "../config/logger"

export const getBodyValidator: (schema: z.ZodTypeAny) => Koa.Middleware = (
  schema: z.ZodTypeAny
) => {
  const bodyValidator: Koa.Middleware = async (ctx, next) => {
    const payload = ctx.request.body
    try {
      schema.parse(payload)
      await next()
    } catch (err) {
      if (err instanceof z.ZodError) {
        const data = err.issues.map(issue => {
          return {
            param: issue.path,
            error: issue.message
          }
        })
        throw new HttpError("Invalid params", 400, data)
      }
    }
  }
  return bodyValidator
}

export const globalErrorHandler: Koa.Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof HttpError) {
      ctx.status = err.status || 500
      ctx.body = {
        success: false,
        message: "Error: " + err.message,
        data: err.data
      }
    }
  } finally {
    const method = ctx.method
    const time = new Date(Date.now())
    const responseStatus = ctx.status ? ctx.status : 200
    const responsePayload = ctx.body ? JSON.stringify(ctx.body) : {}
    logger.info(
      `${time.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata"
      })}: ${method} | ${responseStatus} | ${responsePayload}`
    )
  }
}

export const authenticateBearer: Koa.Middleware = async (ctx, next) => {
  const bearerToken = ctx.request.headers.authorization
  if (R.isNil(bearerToken) || !R.startsWith("Bearer ", bearerToken)) {
    throw new HttpError("Unauthorized access. Empty token.", 401)
  }
  const token = bearerToken.substring(7, bearerToken.length)
  const secret = getSettings()["JWT_SECRET"]
  try {
    const decodedUser = jwt.verify(token, secret) as jwt.JwtPayload
    const user = await findUserByUsername(decodedUser["username"])
    if (R.isNil(user)) {
      throw new HttpError("No corresponding user found", 401)
    }
    delete user["password"]
    ctx["user"] = user
    await next()
  } catch (err) {
    throw err
  }
  await next()
}
