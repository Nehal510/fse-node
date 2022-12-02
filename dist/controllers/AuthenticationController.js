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
    const userDao = UserDao_1.default.getInstance();
    const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = req.body;
        const password = newUser.password;
        const hash = yield bcrypt.hashSync(password, saltRounds);
        console.log("line here");
        newUser.password = hash;
        console.log("line 20", newUser);
        const existingUser = yield userDao.findUserByUsername(req.body.username);
        console.log("line 22", existingUser);
        if (existingUser) {
            res.sendStatus(403);
            console.log("existing user");
            return;
        }
        else {
            const insertedUser = yield userDao.createUser(newUser);
            console.log("creating a new user");
            //@ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    });
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
    const logout = (req, res) => {
        //@ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    };
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
            console.log("Passwords do not match");
        }
    });
    /**
     * @class AuthController Implements RESTful Web service API for authentication resource.
     * Defines the following HTTP endpoints:
     * <ul>
     *     <li>POST /auth/login to login to the app</li>
     *     <li>POST /auth/profile to retrieve the profile of the user</li>
     *     <li>POST /auth/logout to logout of the app</li>
     *     <li>POST /auth/signup to signup a user for the app</li>
     * </ul>
     * @property {BookmarkDao} BookmarkDao Singleton DAO implementing bookmark CRUD operations
     * @property {BookmarkController} BookmarkController Singleton controller implementing
     * RESTful Web service API
     */
    app.post("/auth/login", login);
    app.post("/auth/profile", profile);
    app.post("/auth/logout", logout);
    app.post("/auth/signup", signup);
};
exports.default = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map