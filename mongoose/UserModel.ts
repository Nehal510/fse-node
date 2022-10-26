import mongoose from "mongoose";
import UserSchema from "./UserSchema";

/**
 * The below  variable  is used to create user model from its schema.
 */
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;

