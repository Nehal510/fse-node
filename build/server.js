"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server.
 */
const express_1 = __importDefault(require("express"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const mongoose_1 = __importDefault(require("mongoose"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
const options = {
    useNewUrlParser: true,
    //    useUnifiesTopology: true,
    autoIndex: false,
    //    maxPollSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};
mongoose_1.default.connect('mongodb://localhost:27017/tuiterdb', options);
const userDao = new UserDao_1.default();
const userController = new UserController_1.default(app, userDao);
console.log('hello world');
const tuitDao = new TuitDao_1.default();
const tuitController = new TuitController_1.default(app, tuitDao);
const likeController = LikeController_1.default.getInstance(app);
const followController = FollowController_1.default.getInstance(app);
const bookmarkController = BookmarkController_1.default.getInstance(app);
const messageController = MessageController_1.default.getInstance(app);
app.get('/', (req, res) => res.send('Welcome to Foundation of Software Engineering!!!!'));
app.get('/hello', (req, res) => res.send('Welcome to Foundation of Software Engineering!'));
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
