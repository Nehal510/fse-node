import mongoose, {Schema} from "mongoose";
import Like from "../models/Like";

/**
 * @typedef LikeSchema Represents likes
 * @property tuit represents tuit
 * @property likedBy represents the user
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;