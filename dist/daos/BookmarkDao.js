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
const BookmarkModel_1 = __importDefault(require("../mongoose/BookmarkModel"));
/**
 * @class BookmarkeDao it implements the DAO for bookmarks resource
 * @property {BookmarkDao} bookmarkDao private single instance of BookmarkDao
 */
class BookmarkDao {
    constructor() {
        /**
         * A user bookmarks a tuit
         * @param uid is the user id of the user who is bookmarking a tuit
         * @param tid is the tuit id of the tuit which is getting bookmarked
         * @returns {Promise} of bookmark
         */
        this.userBookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.create({ bookmarkedBy: uid, bookmarkedTuit: tid }); });
        /**
         * A user unbookmarks a tuit
         * @param uid is the user id of the user who is unbookmarking a tuit
         * @param tid is the tuit id of the tuit which is getting unbookmarked
         * @returns {Promise} of any
         */
        this.userUnbookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteOne({ bookmarkedBy: uid, bookmarkedTuit: tid }); });
        /**
         * Retrieve all the bookmarked tuits of a user
         * @param uid is the user id of the user for whom the bookmarked tuits have to be retrieved
         * @returns {Promise} of bookmark array
         */
        this.findAllBookmarkedTuits = (uid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.find({ bookmarkedBy: uid }).populate("bookmarkedTuit").exec(); });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
 * Singleton DAO instance
 * @returns bookmarkDao
 */
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
//# sourceMappingURL=BookmarkDao.js.map