import Tuit from "./Tuit";
import User from "./User";

/**
 * The below represents bookmark model and structure.
 */
export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User
};