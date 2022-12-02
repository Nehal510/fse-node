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
const FollowModel_1 = __importDefault(require("../mongoose/FollowModel"));
/**
 * @class FollowDao it implements the DAO for follows resource
 * @property {FollowDao} followDao private single instance of FollowDao
 */
class FollowDao {
    constructor() {
        /**
         * A user follows another user
         * @param uid is the user id of the user who is following another user
         * @param uid1 is the user id of the user who is getting followed
         * @returns {Promise} of follow array
         */
        this.userFollowsAnotherUser = (uid, uid1) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ userFollowing: uid, userFollowed: uid1 }); });
        /**
         * A user unfollows another user
         * @param uid is the user id of the user who is unfollowing another user
         * @param uid1 is the user id of the user who is getting unfollowed
         * @returns {Promise} of any
         */
        this.userUnfollowsAnotherUser = (uid, uid1) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ userFollowing: uid, userFollowed: uid1 }); });
        /**
         * Find all the users a user is following
         * @param uid is the user id of the user for whom all the users they are
         * following has to be retrieved
         * @returns {Promise} of follow array
         */
        this.findAllFollowing = (uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.find({ userFollowing: uid }).populate("userFollowed").exec(); });
        /**
         * Find all the followers of a user
         * @param uid is the user id of the user for whom all the followers
         * have to be retrieved
         * @returns {Promise} of follow array
         */
        this.findAllFollowers = (uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.find({ userFollowed: uid }).populate("userFollowing").exec(); });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * Singleton DAO instance
 * @returns followDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
//# sourceMappingURL=FollowDao.js.map