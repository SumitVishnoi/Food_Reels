import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const authUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token

    if(!token) {
        return res.status(400).json({
            message: "Please login first"
        })
    }

   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)

    req.user = user

    next()
   } catch (error) {
    return res.status(500).json({message:"Invalid Token" })
   }
}