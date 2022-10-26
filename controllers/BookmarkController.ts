/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

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
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/unbookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllBookmarkedTuits);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}
    /**
     * A user bookmarks a tuit
     * @param {Request} req Represents request from client, including the path
     * parameter uid and tid representing the user and the tuit to be bookmarked respectively
     * @param {Response} res Represents response to client, including the
     *body formatted as JSON containing the new bookmark that was inserted in the database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));
    /**
     * Unbookmarks a tuit by a user
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unbookmarking
     * the tuit and the tuit being unbookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
    /**
     * Retrieves all bookmarked tuits of a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user for whom the bookmarked tuits have to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit/bookmark objects
     */
    findAllBookmarkedTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookmarkedTuits(req.params.uid)
            .then(bookmarks => res.json(bookmarks));
};