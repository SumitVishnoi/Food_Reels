import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"


export const register = async (req, res) => {
    try {
        const {fullName, email, password} = req.body

        const isUserExist = await User.findOne({email})

        if(isUserExist) {
            return res.status(400).json({message: "User already exists"})
        } 

        const hashedPassword = await bcrypt.hash(password, 10)



        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(200).json({
            message:"Registration successfully",
            id:user._id,
            email: user.email,
            fullName: user.fullName
        })
    } catch (error) {
        return res.status(500).json({message: `user register error ${error}`})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        const isUserExist = await bcrypt.compare(password, user.password)

        if(!isUserExist) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(200).json({
            message: "Logged in successfully",
            id: user._id,
            email: user.email,
            fullName: user.fullName
        })
    } catch (error) {
        return res.status(500).json({message: `login error ${error}`})
    }
}

export const logout = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        return res.status(500).json({message: `logout error ${error}`})
    }
}

//Get user
export const getUser = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId).select("-password")

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message: `get user error ${error}`})
    }
}