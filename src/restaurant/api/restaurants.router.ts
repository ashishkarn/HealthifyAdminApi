import Router from "@koa/router"
import { pipeline as getAllRestaurants } from "./get-all-restaurants"
import { pipeline as getUserWorkload } from "./get-user-workload"
import { pipeline as getRestaurantByPlaceId } from "./get-restaurant-by-placeId"
import { pipeline as updateSurveyStatus } from "./update-restaurant-status"

export const router = new Router()

router.get("/getAllRestaurants", getAllRestaurants)
router.get("/getUserWorkload", getUserWorkload)
router.get("/getRestaurantByPlaceId/:restaurantName", getRestaurantByPlaceId)
router.patch("/updateSurveyStatus", updateSurveyStatus)
