import mongoose from "mongoose";

/**
 * @typedef TuitSchema Represents tuits
 * @property tuit represents tuit
 * @property postedOn represents the date on which the tuit was posted
 * @property postedBy represents the user who has posted the tuit
 */
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
}, {collection: 'tuits'});
export default TuitSchema;