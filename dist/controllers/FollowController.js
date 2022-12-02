"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowDao_1 = __importDefault(require("../daos/FollowDao"));
/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/follows to retrieve all the users that a user is following
 *     </li>
 *     <li>GET /api/users/:uid/followers to retrieve all the followers of a user
 *     </li>
 *     <li>POST /api/users/:uid/follows/:uid1 to make one user follow another user
 *     </li>
 *     <li>DELETE /api/users/:uid/unfollows/:uid1 to make a user unfollow another user
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API for follows resource
 */
class FollowController {
    constructor() {
        /**
         * One user follows another user
         * @param {Request} req Represents request from client, including the path
         * parameter uid and uid1 representing the user ids of the 2 users
         * @param {Response} res Represents response to client, including the
         *body formatted as JSON containing the new follow that was inserted in the database
         */
        this.userFollowsAnotherUser = (req, res) => FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.uid1)
            .then(follows => res.json(follows));
        /**
         * One user unfollows another user
         * @param {Request} req Represents request from client, including the path
         * parameter uid and uid1 representing the user ids of the 2 users
         * @param {Response} res Represents response to client, including status
         * on whether deleting the follow was successful or not
         */
        this.userUnfollowsAnotherUser = (req, res) => FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.uid1)
            .then(status => res.send(status));
        /**
         * Retrieves all the users that a specific user is following
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user for whom the users they are following have to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the follows/user objects
         */
        this.findAllFollowing = (req, res) => FollowController.followDao.findAllFollowing(req.params.uid)
            .then(follows => res.json(follows));
        /**
         * Retrieves all the followers of a user
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user for whom the followers have to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the follows/user objects
         */
        this.findAllFollowers = (req, res) => FollowController.followDao.findAllFollowers(req.params.uid)
            .then(follows => res.json(follows));
    }
}
exports.default = FollowController;
FollowController.followDao = FollowDao_1.default.getInstance();
FollowController.followController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return FollowController
 */
FollowController.getInstance = (app) => {
    if (FollowController.followController === null) {
        FollowController.followController = new FollowController();
        app.post("/api/users/:uid/follows/:uid1", FollowController.followController.userFollowsAnotherUser);
        app.delete("/api/users/:uid/unfollows/:uid1", FollowController.followController.userUnfollowsAnotherUser);
        app.get("/api/users/:uid/follows", FollowController.followController.findAllFollowing);
        app.get("/api/users/:uid/followers", FollowController.followController.findAllFollowers);
    }
    return FollowController.followController;
};
;
//# sourceMappingURL=FollowController.js.map