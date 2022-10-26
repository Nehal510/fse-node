/**
 * @file DAO RESTful Web service API for follows resource
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

/**
 * @class FollowDao it implements the DAO for follows resource
 * @property {FollowDao} followDao private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Singleton DAO instance
     * @returns followDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    /**
     * A user follows another user
     * @param uid is the user id of the user who is following another user
     * @param uid1 is the user id of the user who is getting followed
     * @returns {Promise} of follow array
     */
    userFollowsAnotherUser = async (uid: string, uid1: string): Promise<Follow> =>
        FollowModel.create({userFollowing: uid, userFollowed: uid1});
    /**
     * A user unfollows another user
     * @param uid is the user id of the user who is unfollowing another user
     * @param uid1 is the user id of the user who is getting unfollowed
     * @returns {Promise} of any
     */
    userUnfollowsAnotherUser = async (uid: string, uid1: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid, userFollowed: uid1});
    /**
     * Find all the users a user is following
     * @param uid is the user id of the user for whom all the users they are
     * following has to be retrieved
     * @returns {Promise} of follow array
     */
    findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid}).populate("userFollowed").exec();
    /**
     * Find all the followers of a user
     * @param uid is the user id of the user for whom all the followers
     * have to be retrieved
     * @returns {Promise} of follow array
     */
    findAllFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowed: uid}).populate("userFollowing").exec();
}

