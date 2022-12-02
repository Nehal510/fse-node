"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkDao_1 = __importDefault(require("../daos/BookmarkDao"));
/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all the bookmarked tuits of the user
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:tid to bookmark a tuit by a user
 *     </li>
 *     <li>DELETE /api/users/:uid/unbookmarks/:tid to unbookmark a tuit by a user
 *     </li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API for bookmarks resource
 */
class BookmarkController {
    constructor() {
        /**
         * A user bookmarks a tuit
         * @param {Request} req Represents request from client, including the path
         * parameter uid and tid representing the user and the tuit to be bookmarked respectively
         * @param {Response} res Represents response to client, including the
         *body formatted as JSON containing the new bookmark that was inserted in the database
         */
        this.userBookmarksTuit = (req, res) => BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));
        /**
         * Unbookmarks a tuit by a user
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is unbookmarking
         * the tuit and the tuit being unbookmarked
         * @param {Response} res Represents response to client, including status
         * on whether deleting the bookmark was successful or not
         */
        this.userUnbookmarksTuit = (req, res) => BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
        /**
         * Retrieves all bookmarked tuits of a user
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user for whom the bookmarked tuits have to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit/bookmark objects
         */
        this.findAllBookmarkedTuits = (req, res) => BookmarkController.bookmarkDao.findAllBookmarkedTuits(req.params.uid)
            .then(bookmarks => res.json(bookmarks));
    }
}
exports.default = BookmarkController;
BookmarkController.bookmarkDao = BookmarkDao_1.default.getInstance();
BookmarkController.bookmarkController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return BookmarkController
 */
BookmarkController.getInstance = (app) => {
    if (BookmarkController.bookmarkController === null) {
        BookmarkController.bookmarkController = new BookmarkController();
        app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
        app.delete("/api/users/:uid/unbookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
        app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllBookmarkedTuits);
    }
    return BookmarkController.bookmarkController;
};
;
//# sourceMappingURL=BookmarkController.js.map