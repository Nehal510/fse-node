import User from "./User";

/**
 * The below represents message model and structure.
 */
export default interface Message {
    message: String,
    sentTo: User,
    sentBy: User,
    sentOn: Date
};