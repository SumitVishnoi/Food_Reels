import express from 'express'
import { login, logout, register, getUser } from '../controllers/auth.controller.js'
import { authUserMiddleware } from '../middlewares/auth.middleware.js'

const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/logout", logout)

authRouter.get("/getuser", authUserMiddleware, getUser)

export default authRouter