import User from "./User";

/**
 * The below represents follow model and structure.
 */
export default interface Follow {
    userFollowed: User,
    userFollowing: User
};