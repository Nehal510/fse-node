import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * @typedef MessageSchema Represents messages
 * @property message represents the message text
 * @property sentTo represents the user to whom the message is sent
 * @property sentBy represents the user from whom the message is sent
 * @property sentOn represents the date on which the message is sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, default: ""},
    sentTo: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now},
}, {collection: "messages"});
export default MessageSchema;