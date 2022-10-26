/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import UserDao from "./daos/UserDao";
import UserController from "./controllers/UserController";
import TuitDao from "./daos/TuitDao";
import TuitController from "./controllers/TuitController";
import mongoose from "mongoose";
import LikeDao from "./daos/LikeDao";
import LikeController from "./controllers/LikeController";
import FollowDao from "./daos/FollowDao";
import FollowController from "./controllers/FollowController";
import MessageDao from "./daos/MessageDao";
import MessageController from "./controllers/MessageController";
import BookmarkDao from "./daos/BookmarkDao";
import BookmarkController from "./controllers/BookmarkController";
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

const options = {
    useNewUrlParser: true,
//    useUnifiesTopology: true,
    autoIndex: false,
//    maxPollSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

mongoose.connect('mongodb://localhost:27017/tuiterdb', options);
const userDao = new UserDao();
const userController = new UserController(app, userDao);
console.log('hello world')
const tuitDao = new TuitDao();
const tuitController = new TuitController(app, tuitDao);

const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);





app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
