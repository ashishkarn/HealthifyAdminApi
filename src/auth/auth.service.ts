import * as db from "../db"
import { DB, COLLECTION } from "../constants"

export const findUserByUsernamePassword = async (
  username: string,
  password: string
) => {
  const collection = await db.getCollection(COLLECTION.USER, DB.HEALTHIFY)
  const result = await collection.findOne({
    username,
    password
  })
  return result
}

export const findUserByUsername = async (username: string) => {
  const collection = await db.getCollection(COLLECTION.USER, DB.HEALTHIFY)
  const result = await collection.findOne({
    username
  })
  return result
}
