import {Request, Response, Express} from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/DislikeControllerI";
import TuitDao from "../daos/TuitDao";
import LikeDao from "../daos/LikeDao";

export default class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeController: DislikeController | null = null;

    public static getInstance = (app: Express): DislikeController => {
        if (DislikeController.dislikeController == null) {
            DislikeController.dislikeController = new DislikeController();
             app.post("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userDislikesTuit);
            app.delete("/api/users/:uid/undislikes/:tid", DislikeController.dislikeController.userUndislikesTuit);
            app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
            app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
        }
        return DislikeController.dislikeController;
    }
    private constructor() {}

    userDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
            .then(dislikes => res.json(dislikes));

    userUndislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userUndislikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === 'me' && profile ?
            profile._id : uid
        //try {
        console.log("In dislikes")
            const userAlreadyDislikedTuit = await DislikeController.dislikeDao
                .findUserDislikesTuit(userId, tid);
            const howManyDislikedTuit = await DislikeController.dislikeDao
                .countHowManyDislikedTuit(tid);
            let tuit = await DislikeController.tuitDao
                .findTuitById(tid);
            if (userAlreadyDislikedTuit) {
                await DislikeController.dislikeDao.userUndislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit - 1;
            } else {
                await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit + 1;
                const userLikedTuit = await DislikeController.likeDao
                    .findUserLikesTuit(userId, tid);
                if (userLikedTuit) {
                    const howManyLikedTuit = await DislikeController.likeDao
                        .countHowManyLikedTuit(tid);
                    await DislikeController.likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }
            }
            await DislikeController.tuitDao.updateStats(tid, tuit.stats);
            res.sendStatus(200);
       /* } catch (e) {
            res.sendStatus(404);
        }*/
    }

    findAllTuitsDislikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === 'me' && profile ?
            profile._id : uid;
        DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
            .then(dislikes => {
                const dislikesNonNullTuits =
                    dislikes.filter(dislike => dislike.tuit);
                const tuitsFromDislikes =
                    dislikesNonNullTuits.map(dislike => dislike.tuit);
                res.json(tuitsFromDislikes);
            });
    }

}