import Tuit from "./Tuit";
import User from "./User";

/**
 * The below represents like model and structure.
 */
export default interface Like {
    tuit: Tuit,
    likedBy: User
};