import Tuit from "./Tuit";
import User from "./User";

/**
 * The below represents dislike model and structure.
 */
export default class Dislike {
    tuit: Tuit | null = null;
    dislikedBy: User | null = null;
};