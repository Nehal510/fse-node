import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

/**
 * The below  variable  is used to create tuit model from its schema.
 */
const TuitModel = mongoose.model('TuitModel', TuitSchema);
export default TuitModel;

