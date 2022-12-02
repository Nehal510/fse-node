"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server.
 */
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
// import DislikeController from "./controllers/DislikeController";
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const AuthenticationController_1 = __importDefault(require("./controllers/AuthenticationController"));
const express_session_1 = __importDefault(require("express-session"));
//require('dotenv').config()
const connectionString = "mongodb+srv://nehal:fsea2@cluster0.mdwo1jk.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default.connect(connectionString);
const cors = require('cors');
const app = (0, express_1.default)();
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};
let sess = {
    secret: 'process.env.SECRET',
    cookie: {
        secure: false
    },
    proxy: true,
    resave: true,
    saveUninitialized: true
};
app.use(cors(corsOptions));
app.use((0, express_session_1.default)(sess));
app.use(express_1.default.json());
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const likesController = LikeController_1.default.getInstance(app);
// const dislikeController = DislikeController.getInstance(app);
const followController = FollowController_1.default.getInstance(app);
const bookmarkController = BookmarkController_1.default.getInstance(app);
const messageController = MessageController_1.default.getInstance(app);
(0, AuthenticationController_1.default)(app);
app.get('/', (req, res) => res.send('Im updating!!!!'));
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
//# sourceMappingURL=server.js.map