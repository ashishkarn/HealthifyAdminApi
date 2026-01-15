import { logger } from "./config/logger"
import * as mongo from "mongodb"
import { COLLECTION, DB } from "./constants"

interface IMongoConn {
  uri: string
  dbName: DB
}

const dbs: Record<string, mongo.Db> = {}

export const connect = async (connectionObj: IMongoConn): Promise<mongo.Db> => {
  logger.info(`uri: ${connectionObj.uri}, name: ${connectionObj.dbName}`)

  const client = await mongo.MongoClient.connect(connectionObj.uri)
  const db = client.db(connectionObj.dbName)
  setDbNameToDbMap(connectionObj.dbName, db)
  return db
}

export const setDbNameToDbMap = (dbName: DB, db: mongo.Db) => {
  logger.info(`Setting Db with name: ${dbName}`)
  dbs[dbName] = db
  logger.info(`Dbs available: ${Object.keys(dbs).join(",")}`)
}

export const getDbFromDbName = (dbName: DB): mongo.Db => {
  const db = dbs[dbName]
  if (!db) {
    logger.error(`Db with name: ${dbName} not found`)
    throw new Error(`Db with name: ${dbName} not found`)
  }
  return db
}

export const getCollection = async (
  collectionName: COLLECTION,
  dbName: DB = DB.HEALTHIFY
) => {
  const db = getDbFromDbName(dbName)
  return db.collection(collectionName)
}
