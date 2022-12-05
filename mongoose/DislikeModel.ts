import mongoose from "mongoose";
import DislikeSchema from "./DislikeSchema";

/**
 * The below  variable  is used to create dislike model from its schema.
 */
const DislikeModel = mongoose.model('DislikeModel', DislikeSchema);

export default DislikeModel;