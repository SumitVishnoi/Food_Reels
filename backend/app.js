import cookieParser from 'cookie-parser'
import express from 'express'
import authRouter from './routes/auth.routes.js'
import foodPartnerRouter from './routes/foodPartner.route.js'
import foodRouter from './routes/food.route.js'
import cors from 'cors'

const app = express()
app.use(cors({
    origin:["http://localhost:5173", "https://food-reels.netlify.app"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res)=> {
    res.send("Server is started")
})

app.use("/api/auth", authRouter)
app.use("/api/partner", foodPartnerRouter)
app.use("/api/food", foodRouter)

export default app