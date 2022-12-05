/**
 * @file Controller RESTful Web service API for authentication
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync(10);

const AuthenticationController = (app: Express) => {

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return AuthenticationController
     */
    const userDao: UserDao = UserDao.getInstance()



    /**
     * For registering a new user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the status
     * whether the user has been successfully registered or not
     */
    const signup = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hashSync(password, saltRounds);
        newUser.password = hash;
        const existingUser = await userDao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao.createUser(newUser);
            //@ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    /**
     * This is for fetching the profile of a logged in user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * status of whether the profile has been fetched successfully or not
     */
    const profile = (req: Request, res: Response) => {
        //@ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * This is for logging out a user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * status of whether a user has been successfully logged out or not
     */
    const logout = (req: Request, res: Response) => {
        //@ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    /**
     * For logging in a registered user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * status of whether a regsitered user has been successfully logged in or not
     */
    const login = async (req: Request, res: Response) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = await userDao
            .findUserByUsername(username);
        if (!existingUser) {
            res.sendStatus(403);
            return;
        }
        const match = await bcrypt
            .compareSync(password, existingUser.password);
        if (match) {
            //@ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    };
    /**
     * @class AuthenticationController Implements RESTful Web service API for authentciation
     * Defines the following HTTP endpoints:
     * <ul>
     *     <li>POST /auth/login to login a registered user
     *     </li>
     *     <li>POST /auth/profile to fetch profile of a logged in user
     *     </li>
     *     <li>POST /auth/logout to logout a logged in user
     *     </li>
     *     <li>POST /auth/signup to signup or register a new user
     *     </li>
     * </ul>
     * @property {AutheticationController} AuthenticationController Singleton controller implementing
     * RESTful Web service API
     */
    app.post("/auth/login", login);
    app.post("/auth/profile", profile);
    app.post("/auth/logout", logout);
    app.post("/auth/signup", signup);
}

export default AuthenticationController;