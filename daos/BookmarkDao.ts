/**
 * @file DAO RESTful Web service API for bookmarks resource
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";

/**
 * @class BookmarkeDao it implements the DAO for bookmarks resource
 * @property {BookmarkDao} bookmarkDao private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Singleton DAO instance
     * @returns bookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}
    /**
     * A user bookmarks a tuit
     * @param uid is the user id of the user who is bookmarking a tuit
     * @param tid is the tuit id of the tuit which is getting bookmarked
     * @returns {Promise} of bookmark
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});
    /**
     * A user unbookmarks a tuit
     * @param uid is the user id of the user who is unbookmarking a tuit
     * @param tid is the tuit id of the tuit which is getting unbookmarked
     * @returns {Promise} of any
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});
    /**
     * Retrieve all the bookmarked tuits of a user
     * @param uid is the user id of the user for whom the bookmarked tuits have to be retrieved
     * @returns {Promise} of bookmark array
     */
    findAllBookmarkedTuits = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid}).populate("bookmarkedTuit").exec();
}