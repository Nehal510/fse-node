/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";

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
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid/follows/:uid1", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid/unfollows/:uid1", FollowController.followController.userUnfollowsAnotherUser);
            app.get("/api/users/:uid/follows", FollowController.followController.findAllFollowing);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllFollowers);
        }
        return FollowController.followController;
    }

    private constructor() {}
    /**
     * One user follows another user
     * @param {Request} req Represents request from client, including the path
     * parameter uid and uid1 representing the user ids of the 2 users
     * @param {Response} res Represents response to client, including the
     *body formatted as JSON containing the new follow that was inserted in the database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.uid1)
            .then(follows => res.json(follows));
    /**
     * One user unfollows another user
     * @param {Request} req Represents request from client, including the path
     * parameter uid and uid1 representing the user ids of the 2 users
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.uid1)
            .then(status => res.send(status));
    /**
     * Retrieves all the users that a specific user is following
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user for whom the users they are following have to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows/user objects
     */
    findAllFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowing(req.params.uid)
            .then(follows => res.json(follows));
    /**
     * Retrieves all the followers of a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user for whom the followers have to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows/user objects
     */
    findAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowers(req.params.uid)
            .then(follows => res.json(follows));
};

