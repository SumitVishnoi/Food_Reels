import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true
    },
    text: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
