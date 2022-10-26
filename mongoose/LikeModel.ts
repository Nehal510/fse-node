import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

/**
 * The below  variable  is used to create like model from its schema.
 */
const LikeModel = mongoose.model("LikeModel", LikeSchema);
export default LikeModel;