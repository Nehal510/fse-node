import mongoose from "mongoose";

/**
 * @typedef DislikeSchema Represents dislikes
 * @property tuit represents tuit
 * @property dislikedBy represents the user
 */
const DislikeSchema = new mongoose.Schema({
    tuit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TuitModel',
        required: true
    },
    dislikedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
}, {collection: 'dislikes'});

export default DislikeSchema;