/**
 * @file Declares API for bookmarks related data access object methods
 */
import Bookmark from "../models/Bookmark";

export default interface BookmarkDaoI {
    userBookmarksTuit (uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksTuit (uid: string, tid: string): Promise<any>;
    findAllBookmarkedTuits (uid: string): Promise<Bookmark[]>;
};