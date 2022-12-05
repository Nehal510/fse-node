/**
 * @file DAO RESTful Web service API for dislikes resource
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/DislikeModel";
import Dislike from "../models/Dislike";

/**
 * @class DislikeDao it implements the DAO for dislikes resource
 * @property {DislikeDao} dislikeDao private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Singleton DAO instance
     * @returns dislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao == null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    };

    private constructor() {}

    /**
     * This is for a user disliking a tuit
     * @param tid of the tuit which is being disliked
     * @param uid of the user who is disliking the tuit
     * @returns {Promise} of any
     */
    async userDislikesTuit(uid: string, tid: string): Promise<any> {
        return DislikeModel.create({
            tuit: tid,
            dislikedBy: uid
        });
    }

    /**
     * This is for deleting a dislike on a tuit by a user
     * @param tid of the tuit which is being undisliked
     * @param uid of the user who is undisliking the tuit
     * @returns {Promise} of any
     */
    async userUndislikesTuit(uid: string, tid: string): Promise<any> {
        return DislikeModel.deleteOne({
            tuit: tid,
            dislikedBy: uid
        });
    }

    /**
     * This is for finding if a user dislikes a tuit or not
     * @param tid of the tuit in consideration
     * @param uid of the user in consideration
     * @returns {Promise} of dislike object
     */
    async findUserDislikesTuit(uid: string, tid: string): Promise<Dislike> {
        return DislikeModel.findOne({
            tuit: tid,
            dislikedBy: uid
        });
    }

    /**
     * This is for counting how many users have disliked a particular tuit
     * @param tid of the tuit in consideration
     * @returns {Promise} of any
     */
    async countHowManyDislikedTuit(tid: string): Promise<any> {
        return DislikeModel.count({tuit: tid});
    }

    /**
     * This is for finding all the tuits disliked by a user
     * @param uid of the user in consideration
     * @returns {Promise} of any
     */
    async findAllTuitsDislikedByUser(uid: string): Promise<any> {
        return DislikeModel
            .find(({dislikedBy: uid}))
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();
    }


}
