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
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync(10);
const AuthenticationController = (app) => {
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return AuthenticationController
     */
    const userDao = UserDao_1.default.getInstance();
    /**
     * For registering a new user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the status
     * whether the user has been successfully registered or not
     */
    const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = req.body;
        const password = newUser.password;
        const hash = yield bcrypt.hashSync(password, saltRounds);
        newUser.password = hash;
        const existingUser = yield userDao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        }
        else {
            const insertedUser = yield userDao.createUser(newUser);
            //@ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    });
    /**
     * This is for fetching the profile of a logged in user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * status of whether the profile has been fetched successfully or not
     */
    const profile = (req, res) => {
        //@ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        }
        else {
            res.sendStatus(403);
        }
    };
    /**
     * This is for logging out a user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * status of whether a user has been successfully logged out or not
     */
    const logout = (req, res) => {
        //@ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    };
    /**
     * For logging in a registered user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * status of whether a regsitered user has been successfully logged in or not
     */
    const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = yield userDao
            .findUserByUsername(username);
        if (!existingUser) {
            res.sendStatus(403);
            return;
        }
        const match = yield bcrypt
            .compareSync(password, existingUser.password);
        if (match) {
            //@ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        }
        else {
            res.sendStatus(403);
        }
    });
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
};
exports.default = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map