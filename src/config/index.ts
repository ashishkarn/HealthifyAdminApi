import * as dotenv from "dotenv"
import * as path from "path"
import { logger } from "./logger"

export interface IConfig {
  NODE_ENV: string
  MONGO_DB_URI: string
  PORT: number
  JWT_SECRET: string
}

let settings: IConfig

const setupEnv = () => {
  const envPath = path.resolve(__dirname, "../../environment/.env")
  logger.info("Loading env file from: " + envPath)
  dotenv.config({
    path: envPath
  })
}

export const configure = (): IConfig => {
  setupEnv()
  logger.info("Environment Detected: " + process.env["NODE_ENV"])

  settings = makeEnvSettings(process.env)
  return settings
}

export const getSettings = () => {
  return settings ? settings : makeEnvSettings(process.env)
}

const makeEnvSettings = (env: NodeJS.ProcessEnv): IConfig => {
  const config = {
    NODE_ENV: env["NODE_ENV"],
    MONGO_DB_URI: env["MONGO_DB_URI"],
    PORT: Number(env["PORT"]),
    JWT_SECRET: env["JWT_SECRET"]
  }
  return config as IConfig
}
