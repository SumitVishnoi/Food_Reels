import express from 'express'
import { foodPartnerMiddleware } from '../middlewares/foodPartner.middleware.js'
import { commentOnFood, createFood, getCommentsForFood, getFoodItems, getSavedFood, likeFood, saveFood } from '../controllers/food.controller.js'
import multer from 'multer'
import { authUserMiddleware } from '../middlewares/auth.middleware.js'

const upload = multer({
    storage: multer.memoryStorage(),
})

const foodRouter = express.Router()

foodRouter.post("/", foodPartnerMiddleware,upload.single("video"), createFood)

foodRouter.get("/", authUserMiddleware, getFoodItems)

//like food route
foodRouter.post("/like", authUserMiddleware, likeFood)

//save food route
foodRouter.post("/save", authUserMiddleware, saveFood)
foodRouter.get("/savedfood", authUserMiddleware, getSavedFood)

//comment on food route
foodRouter.post("/comment/:foodId", authUserMiddleware, commentOnFood)
foodRouter.get("/comments/:foodId", getCommentsForFood)


export default foodRouter