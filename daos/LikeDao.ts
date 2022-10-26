/**
 * @file DAO RESTful Web service API for likes resource
 */
import Like from "../models/Like";
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";

/**
 * @class LikeDao it implements the DAO for likes resource
 * @property {LikeDao} likeDao private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    /**
     * Singleton DAO instance
     * @returns likeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}
    /**
     * Retrieves all the users that have liked a tuit
     * @param tid of the tuit for which the users who liked the tuit have to be retrieved
     * @returns {Promise} of like array
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();
    /**
     * Retrieves all the tuits that have been liked by a user
     * @param uid of the user for whom the liked tuits have to be retrieved
     * @returns {Promise} of like array
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();
    /**
     * User likes a tuit
     * @param tid of the tuit which is getting liked
     * @param uid of the user who is liking the tuit
     * @returns {Promise} of any
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});
    /**
     * User unlikes a tuit
     * @param tid of the tuit which is getting unliked
     * @param uid of the user who is unliking the tuit
     * @returns {Promise} of any
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}

