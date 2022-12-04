import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/DislikeModel";
import Dislike from "../models/Dislike";

export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao == null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    };

    private constructor() {}

    async userDislikesTuit(uid: string, tid: string): Promise<any> {
        return DislikeModel.create({
            tuit: tid,
            dislikedBy: uid
        });
    }

    async userUndislikesTuit(uid: string, tid: string): Promise<any> {
        return DislikeModel.deleteOne({
            tuit: tid,
            dislikedBy: uid
        });
    }

    async findUserDislikesTuit(uid: string, tid: string): Promise<Dislike> {
        return DislikeModel.findOne({
            tuit: tid,
            dislikedBy: uid
        });
    }

    async countHowManyDislikedTuit(tid: string): Promise<any> {
        return DislikeModel.count({tuit: tid});
    }

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
