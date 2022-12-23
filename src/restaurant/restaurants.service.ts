import * as db from "../db"
import { DB, COLLECTION } from "../constants"
import { IUpdateRestaurantStatus } from "./restaurant.common"
import * as R from "ramda"
import { HttpError } from "../utils/utils"

export const findAll = async () => {
  const collection = await db.getCollection(
    COLLECTION.RESTAURANTS,
    DB.HEALTHIFY
  )
  const result = await collection.find().project({ _id: 0 }).toArray()
  return result
}

export const findWorkloadRestaurants = async (limit: number, skip: number) => {
  const collection = await db.getCollection(
    COLLECTION.RESTAURANTS,
    DB.HEALTHIFY
  )
  const result = await collection
    .find()
    .skip(skip)
    .limit(limit)
    .project({ _id: 0 })
    .toArray()
  return result
}

export const findByPlaceId = async (_placeId: string) => {
  const collection = await db.getCollection(
    COLLECTION.RESTAURANTS,
    DB.HEALTHIFY
  )
  const result = await collection
    .find({
      placeId: _placeId
    })
    .toArray()
  return result.pop()
}

export const updateRestaurantStatus = async (
  updateRestaurantStatusObj: IUpdateRestaurantStatus,
  user: string
) => {
  const placeId = updateRestaurantStatusObj.placeId
  const restaurant = await findByPlaceId(placeId)
  if (R.isNil(restaurant)) {
    throw new HttpError("Restaurant not found", 400)
  }
  const updateObj =
    updateRestaurantStatusObj as Partial<IUpdateRestaurantStatus>
  delete updateObj.placeId
  const finalStatusObj = R.isNil(restaurant.surveyStatus)
    ? updateObj
    : R.mergeDeepRight(restaurant.surveyStatus, updateObj)
  const collection = await db.getCollection(
    COLLECTION.RESTAURANTS,
    DB.HEALTHIFY
  )
  const result = await collection.findOneAndUpdate(
    {
      placeId
    },
    {
      $set: {
        edited: {
          status: true,
          by: user,
          time: Date.now()
        },
        surveyStatus: finalStatusObj
      }
    },
    {
      returnDocument: "after"
    }
  )
  return result.value
}
