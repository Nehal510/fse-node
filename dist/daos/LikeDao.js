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
const LikeModel_1 = __importDefault(require("../mongoose/LikeModel"));
/**
 * @class LikeDao it implements the DAO for likes resource
 * @property {LikeDao} likeDao private single instance of LikeDao
 */
class LikeDao {
    constructor() {
        /**
         * Retrieves all the users that have liked a tuit
         * @param tid of the tuit for which the users who liked the tuit have to be retrieved
         * @returns {Promise} of like array
         */
        this.findAllUsersThatLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ tuit: tid })
                .populate("likedBy")
                .exec();
        });
        /**
         * Retrieves all the tuits that have been liked by a user
         * @param uid of the user for whom the liked tuits have to be retrieved
         * @returns {Promise} of like array
         */
        this.findAllTuitsLikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ likedBy: uid })
                .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
                .exec();
        });
        /**
         * User likes a tuit
         * @param tid of the tuit which is getting liked
         * @param uid of the user who is liking the tuit
         * @returns {Promise} of any
         */
        this.userLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            console.log("In likes!");
            yield LikeModel_1.default.create({ tuit: tid, likedBy: uid });
        });
        /**
         * User unlikes a tuit
         * @param tid of the tuit which is getting unliked
         * @param uid of the user who is unliking the tuit
         * @returns {Promise} of any
         */
        this.userUnlikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            console.log("In unlikes!");
            yield LikeModel_1.default.deleteOne({ tuit: tid, likedBy: uid });
        });
        /**
         * To find if a specific user likes a tuit
         * @param tid of the tuit in consideration
         * @param uid of the user in consideration
         * @returns {Promise} of like object
         */
        this.findUserLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            console.log("In findUserLikesTuit DAO");
            return yield LikeModel_1.default.findOne({ tuit: tid, likedBy: uid });
        });
        /**
         * To count how may users have liked a tuit
         * @param tid of the tuit in consideration
         * @returns {Promise} of any
         */
        this.countHowManyLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            console.log("In countHowManyLikedTuit DAO");
            return yield LikeModel_1.default.count({ tuit: tid });
        });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
/**
 * Singleton DAO instance
 * @returns likeDao
 */
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
//# sourceMappingURL=LikeDao.js.map