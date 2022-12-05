/**
 * @file Controller RESTful Web service API for dislikes resource
 */
import {Request, Response, Express} from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/DislikeControllerI";
import TuitDao from "../daos/TuitDao";
import LikeDao from "../daos/LikeDao";

/**
 * @class DislikeController Implements RESTful Web service API for dislikes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/dislikes/:tid to record that a user disliked a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/undislikes/:tid to delete a dislike of a user on a tuit
 *     </li>
 *     <li>PUT /api/users/:uid/dislikes/:tid to record toggling of dislike of a tuit
 *     and updating the tuit dislikes
 *     </li>
 *     <li>GET /api/users/:uid/dislikes to fetch all the tuits disliked by a user
 *     </li>
 * </ul>
 * @property {DislikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
 * @property {DislikeController} DislikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeController: DislikeController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return DislikeController
     */
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

    /**
     * This is for disliking a tuit by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid and tid representing the user who is disliking a tuit
     * and the tuit which is being disliked
     * @param {Response} res Represents response to client, including the
     * status of disliking the tuit by a user
     */
    userDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
            .then(dislikes => res.json(dislikes));

    /**
     * This is for removing the dislike on the tuit by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid and tid representing the user who is removing the dislike
     * and the tuit which is being undisliked
     * @param {Response} res Represents response to client, including the
     * status of deleting the dislike on the tuit
     */
    userUndislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userUndislikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    /**
     * This is for toggling of the dislike for a tuit and updating the tuit stats accordingly
     * @param {Request} req Represents request from client, including the path
     * parameter uid and tid representing the user who is toggling the dislike
     * and the tuit for which the dislike is being toggled
     * @param {Response} res Represents response to client, including the
     * status of toggling of dislike of the tuit and updating the tuit stats
     */
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

    /**
     * Retrieves all tuits disliked by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid for whom all the disliekd tuits have to be retrieved
     * @param {Response} res Represents response to client, including the
     * disliked tuits
     */
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