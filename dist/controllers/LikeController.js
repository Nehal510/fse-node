"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
const DislikeDao_1 = __importDefault(require("../daos/DislikeDao"));
/**
 * @class LikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no longer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
class LikeController {
    constructor() {
        /**
         * Retrieves all users that liked a tuit from the database
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsersThatLikedTuit = (req, res) => LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Retrieves all tuits liked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user liked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were liked
         */
        this.findAllTuitsLikedByUser = (req, res) => {
            const uid = req.params.uid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ?
                profile._id : uid;
            LikeController.likeDao.findAllTuitsLikedByUser(userId)
                .then(likes => {
                const likesNonNullTuits = likes.filter(like => like.tuit);
                const tuitsFromLikes = likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            });
        };
        /**
         * This is for recording a like on a tuit by a user
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new likes that was inserted in the
         * database
         */
        this.userLikesTuit = (req, res) => LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));
        /**
         * This is for unliking a tuit by a user
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is unliking
         * the tuit and the tuit being unliked
         * @param {Response} res Represents response to client, including status
         * on whether deleting the like was successful or not
         */
        this.userUnlikesTuit = (req, res) => LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
        /**
         * This is for finding if a specific user has liked a specific tuit or not
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid
         * @param {Response} res Represents response to client, including status
         * on whether the user likes that specific tuit
         */
        this.findUserLikesTuit = (req, res) => {
            console.log("In findUserLikesTuit");
            const tid = req.params.tid;
            const uid = req.params.uid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ?
                profile._id : uid;
            LikeController.likeDao.findUserLikesTuit(userId, tid)
                .then(likes => res.json(likes));
        };
        /**
         * This is for counting how many users have liked the tuit
         * @param {Request} req Represents request from client, including the
         * path parameter tid representing the tuit for which we
         * have to calculate the number of users that have liked the tuit
         * @param {Response} res Represents response to client, including how many
         * users have liked that specific tuit
         */
        this.countHowManyLikedTuit = (req, res) => LikeController.likeDao.countHowManyLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * This is for the toggling of the likes on the tuit and updating the tuit stats accordingly
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is liking or unliking the
         * tuit and the tuit which is being liked or unliked
         * @param {Response} res Represents response to client, including status
         * of toggling the like and updating the tuit stats
         */
        this.userTogglesTuitLikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("In toggles");
            const uid = req.params.uid;
            console.log("uid" + uid);
            const tid = req.params.tid;
            console.log("tid" + tid);
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ?
                profile._id : uid;
            console.log("userId" + userId);
            //try {
            const userAlreadyLikedTuit = yield LikeController.likeDao
                .findUserLikesTuit(userId, tid);
            console.log(userAlreadyLikedTuit);
            const howManyLikedTuit = yield LikeController.likeDao
                .countHowManyLikedTuit(tid);
            console.log(howManyLikedTuit);
            let tuit = yield LikeController.tuitDao.findTuitById(tid);
            console.log(tuit);
            if (userAlreadyLikedTuit) {
                yield LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
                console.log("in unlikes" + tuit.stats.likes);
            }
            else {
                yield LikeController.likeDao.userLikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
                console.log("in likes" + tuit.stats.likes);
                const userDislikedTuit = yield LikeController.dislikeDao
                    .findUserDislikesTuit(userId, tid);
                if (userDislikedTuit) {
                    const howManyDislikedTuit = yield LikeController.dislikeDao
                        .countHowManyDislikedTuit(tid);
                    yield LikeController.dislikeDao.userUndislikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit - 1;
                }
            }
            ;
            console.log("Reached here!");
            yield LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
            /* } catch (e) {
                 res.sendStatus(404);
             }*/
        });
    }
}
exports.default = LikeController;
LikeController.likeDao = LikeDao_1.default.getInstance();
LikeController.tuitDao = TuitDao_1.default.getInstance();
LikeController.likeController = null;
LikeController.dislikeDao = DislikeDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return LikeController
 */
LikeController.getInstance = (app) => {
    if (LikeController.likeController === null) {
        LikeController.likeController = new LikeController();
        app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
        app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
        app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
        app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
        app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
        app.get("/api/likes/:tid", LikeController.likeController.countHowManyLikedTuit);
        app.get("/api/users/:uid/likes/:tid", LikeController.likeController.findUserLikesTuit);
    }
    return LikeController.likeController;
};
;
//# sourceMappingURL=LikeController.js.map