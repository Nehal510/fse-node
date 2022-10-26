/**
 * @file Declares API for bookmarks related controller methods
 */
import {Request, Response} from "express";

export default interface BookmarkControllerI {
    userBookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    findAllBookmarkedTuits (req: Request, res: Response): void;
};