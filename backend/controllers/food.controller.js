import Comment from '../models/comment.model.js';
import foodModel from '../models/food.js';
import Like from '../models/likes.model.js';
import saveModel from '../models/save.model.js';
import {uploadFile} from '../services/storage.service.js'
import { v4 as uuid } from 'uuid';

//create food
export const createFood = async (req, res) => {
    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file)

    const fileUploadResult = await uploadFile(req.file.buffer, uuid())
     
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })
    
    return res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })
}

export const getFoodItems = async (req, res) => {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}

//like food

export const likeFood = async (req, res) => {
     const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await Like.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await Like.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await Like.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })
}

//save food
export const saveFood = async (req, res) => {
     const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { saveCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { saveCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })
}

export const getSavedFood = async (req, res) => {
    const user = req.user

    const savedFood = await saveModel.find({
        user: user._id
    }).populate('food')

    if(!savedFood || savedFood.length === 0) {
        return res.status(404).json({
            message: "No saved foods found"
        })
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFood
    })
}


//comment 
export const commentOnFood = async (req, res) => {
    try {
        const { comment } = req.body;
        const foodId = req.params.foodId;
    const user = req.user;

    const newComment = await Comment.create({
        user: user._id,
        food: foodId,
        text: comment
    });

     await newComment.save();

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { commentCount: 1 }
    });
    res.status(201).json({
        message: "Comment added successfully",
        comment: newComment
    })
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({
            message: "Failed to add comment"
        });
    }
}

export const getCommentsForFood = async (req, res) => {
    const { foodId } = req.params;
    const comments = await Comment.find({ food: foodId }).populate('user', 'username');

    res.status(200).json({
        message: "Comments retrieved successfully",
        comments
    });
};
