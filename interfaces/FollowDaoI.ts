/**
 * @file Declares API for follows related data access object methods
 */
import Follow from "../models/Follow";

export default interface FollowDaoI {
    userFollowsAnotherUser (uid: string, uid1: string): Promise<Follow>;
    userUnfollowsAnotherUser (uid: string, uid1: string): Promise<any>;
    findAllFollowing (uid: string): Promise<Follow[]>;
    findAllFollowers (uid: string): Promise<Follow[]>;
};