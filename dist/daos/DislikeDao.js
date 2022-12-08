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
const DislikeModel_1 = __importDefault(require("../mongoose/DislikeModel"));
/**
 * @class DislikeDao it implements the DAO for dislikes resource
 * @property {DislikeDao} dislikeDao private single instance of DislikeDao
 */
class DislikeDao {
    constructor() { }
    /**
     * This is for a user disliking a tuit
     * @param tid of the tuit which is being disliked
     * @param uid of the user who is disliking the tuit
     * @returns {Promise} of any
     */
    userDislikesTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default.create({
                tuit: tid,
                dislikedBy: uid
            });
        });
    }
    /**
     * This is for deleting a dislike on a tuit by a user
     * @param tid of the tuit which is being undisliked
     * @param uid of the user who is undisliking the tuit
     * @returns {Promise} of any
     */
    userUndislikesTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default.deleteOne({
                tuit: tid,
                dislikedBy: uid
            });
        });
    }
    /**
     * This is for finding if a user dislikes a tuit or not
     * @param tid of the tuit in consideration
     * @param uid of the user in consideration
     * @returns {Promise} of dislike object
     */
    findUserDislikesTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default.findOne({
                tuit: tid,
                dislikedBy: uid
            });
        });
    }
    /**
     * This is for counting how many users have disliked a particular tuit
     * @param tid of the tuit in consideration
     * @returns {Promise} of any
     */
    countHowManyDislikedTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default.count({ tuit: tid });
        });
    }
    /**
     * This is for finding all the tuits disliked by a user
     * @param uid of the user in consideration
     * @returns {Promise} of any
     */
    findAllTuitsDislikedByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default
                .find(({ dislikedBy: uid }))
                .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
                .exec();
        });
    }
}
exports.default = DislikeDao;
DislikeDao.dislikeDao = null;
/**
 * Singleton DAO instance
 * @returns dislikeDao
 */
DislikeDao.getInstance = () => {
    if (DislikeDao.dislikeDao == null) {
        DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
};
//# sourceMappingURL=DislikeDao.js.map