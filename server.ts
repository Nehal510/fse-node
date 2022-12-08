/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import FollowController from "./controllers/FollowController";
import LikeController from "./controllers/LikeController";
import DislikeController from "./controllers/DislikeController";
import MessageController from './controllers/MessageController';
import BookmarkController from './controllers/BookmarkController';
import AuthenticationController from './controllers/AuthenticationController';
import session from "express-session";

const connectionString="mongodb+srv://nehal:fsea2@cluster0.mdwo1jk.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionString);

const cors = require('cors')
const app = express();
const corsOptions ={
    origin:true,
    credentials:true,
    optionSuccessStatus:200
}

let sess = {
    secret: 'process.env.SECRET',
    cookie: {
        secure: false
    },
    proxy: true,
    resave: true,
    saveUninitialized: true
}
app.use(cors(corsOptions));
app.use(session(sess));
app.use(express.json());
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const dislikeController = DislikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
AuthenticationController(app);

app.get('/', (req: Request, res: Response) =>
    res.send("Welcome to FSE"));


/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);





