import * as Koa from "koa"
import compose from "koa-compose"
import * as R from "ramda"
import { HttpError } from "../../utils/utils"
import { findUserByUsernamePassword } from "../auth.service"
import * as jwt from "jsonwebtoken"
import { getSettings } from "../../config"

interface IAuth {
  username: string
  password: string
}

const controller: Koa.Middleware = async (ctx, _next) => {
  const { username, password } = ctx.request.body as IAuth
  if (R.isNil(username) || R.isNil(password)) {
    throw new HttpError("Username and password cannot be empty", 401)
  }
  const user = await findUserByUsernamePassword(username, password)
  if (R.isNil(user)) {
    throw new HttpError("Invalid Username and password", 404)
  }
  const token = jwt.sign(
    { username: user["username"] },
    getSettings()["JWT_SECRET"],
    {
      expiresIn: "4h"
    }
  )
  ctx.body = {
    success: true,
    message: "Authentication Succesful",
    data: {
      bearer: token
    }
  }
}

export const pipeline = compose([controller])
