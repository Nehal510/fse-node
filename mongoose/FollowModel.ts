import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

/**
 * The below  variable  is used to create follow model from its schema.
 */
const FollowModel = mongoose.model("FollowModel", FollowSchema);
export default FollowModel;