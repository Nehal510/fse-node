/**
 * @file Controller RESTful Web service API for users resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users to retrieve all the users
 *     </li>
 *     <li>GET /users/:userid to find user by id
 *     </li>
 *     <li>POST /users to create a new user
 *     </li>
 *     <li>DELETE /users/:userid to delete a specific user
 *     </li>
 *     <li>PUT /users/:userid to update a specific user
 *     </li>
 * </ul>
 * @property {UserDao} userDao DAO implementing users CRUD operations
 * @property {UserController} UserController Controller implementing
 * RESTful Web service API for users resource
 */
export default class UserController implements UserControllerI {
    app: Express;
    userDao: UserDao;
    constructor(app: Express, userDao: UserDao) {
        this.app = app;
        this.userDao = userDao;
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:userid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.put('/users/:userid', this.updateUser);
        this.app.delete('/users/username/:uname', this.deleteUserByUsername);
    }
    /**
     * Retrieves all users
     * @param {Request} req Represents request from client to find all the users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsers = (req: Request, res: Response) =>
        this.userDao.findAllUsers()
            .then(users => res.json(users));
    /**
     * Retrieves a user by id
     * @param {Request} req Represents request from client, including the
     * path parameter uid representing the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user object
     */
    findUserById = (req: Request, res: Response) =>
        this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
    /**
     * Create a new user
     * @param {Request} req Represents request from client, including the
     * body which contains all the details of the new user to be added
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
    createUser = (req: Request, res: Response) =>
        this.userDao.createUser(req.body)
            .then(user => res.json(user));
    /**
     * Delete a specific user from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user to be deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the user was successful or not
     */
    deleteUser = (req: Request, res: Response) =>
        this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
    /**
     * Update a specific user from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user to be updated and the body containing
     * the updates to be made
     * @param {Response} res Represents response to client, including status
     * on whether updating the user was successful or not
     */
    updateUser = (req: Request, res: Response) =>
        this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));

    deleteUserByUsername = (req: Request, res: Response) => {
        return this.userDao.deleteUserByUsername(req.params.uname)
            .then(status => {
                return res.json(status)
            });
    }
}

