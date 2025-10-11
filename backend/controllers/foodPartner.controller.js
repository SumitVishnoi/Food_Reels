import foodPartnerModel from "../models/foodPartner.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import foodModel from "../models/food.js"



export const registerFoodPartner = async (req, res) => {
    try {
        const {name, email, password, contactName, phone, address} = req.body

        const isAccountExist = await foodPartnerModel.findOne({email})
        
        if(isAccountExist) {
            return res.status(400).json({message: "Food Partner account already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const foodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword,
            contactName,
            phone,
            address
        })

        const token = jwt.sign({
            id: foodPartner._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(201).json({
            message: "Food partner registered successfully",
            foodPartner: {
                _id: foodPartner._id,
                email: foodPartner.email,
                name: foodPartner.name,
                contactName: foodPartner.contactName,
                phone: foodPartner.phone,
                address: foodPartner.address
            }
        })
    } catch (error) {
        return res.status(500).json({message: `register foodPartner error ${error}`})
    }
}

export const loginFoodPartner = async (req, res) => {
    try {
        const {email, password} = req.body

        const foodPartner = await foodPartnerModel.findOne({email})

        if(!foodPartner) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        const isfoodPartner = await bcrypt.compare(password, foodPartner.password)

        if(!isfoodPartner) {
            return res.statu(400).json({message: "Invalid email or password"})
        }

        const token = jwt.sign({
            id: foodPartner._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(200).json({
            message:"Food Partner logged in successfully",
            id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        })
    } catch (error) {
        return res.status(500).json({message:`login foodPartner error ${error}`})
    }
}

export const logoutFoodPartner = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "Food Partner logged out successfully"})
    } catch (error) {
        return res.status(500).json({message:`logout foodPartner error ${error}`})
    }
}


// get FoodPartner
export const getFoodPartnerById = async (req, res) => {
    const foodPartnerId = req.params.id

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)

    if(!foodPartner) {
        return res.status(400).json({message: "Food partner not found"})
    }

    const foodItemsByFoodPartner = await foodModel.find({foodPartner: foodPartnerId})

    res.status(200).json({
        message: "Food partner retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }
    })
}