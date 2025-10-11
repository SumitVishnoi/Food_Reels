import express from 'express'
import { getFoodPartnerById, loginFoodPartner, logoutFoodPartner, registerFoodPartner } from '../controllers/foodPartner.controller.js'
import { authUserMiddleware } from '../middlewares/auth.middleware.js'

const foodPartnerRouter = express.Router()

foodPartnerRouter.post("/register", registerFoodPartner)
foodPartnerRouter.post("/login", loginFoodPartner)
foodPartnerRouter.get("/logout", logoutFoodPartner)

//get FoodPartner
foodPartnerRouter.get("/:id", authUserMiddleware, getFoodPartnerById)

export default foodPartnerRouter