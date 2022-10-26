import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 * @typedef FollowSchema Represents follows
 * @property userFollowed represents the user being followed
 * @property userFollowing represents the user following
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;