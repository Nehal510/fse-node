import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";

/**
 * The below  variable  is used to create message model from its schema.
 */
const MessageModel = mongoose.model("MessageModel", MessageSchema);
export default MessageModel;