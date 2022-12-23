import { configure } from "./config"
import { DB } from "./constants"
import * as dbManager from "./db"
import { app } from "./app"
import { logger } from "./config/logger"

const conf = configure()
const main = async () => {
  try {
    await dbManager.connect({
      uri: conf.MONGO_DB_URI,
      dbName: DB.HEALTHIFY
    })
    app.listen(conf.PORT, () => {
      logger.info("Server is running")
    })
  } catch (err: any) {
    logger.error("Server couldn't start " + err.message)
  }
}

main()
