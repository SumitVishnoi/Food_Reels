import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type:String
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    },
    likeCount: {
        type: Number,
        default: 0
    },
    saveCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        text: String,
    }]
}, {timestamps: true})

const foodModel = mongoose.model("food", foodSchema)

export default foodModel

