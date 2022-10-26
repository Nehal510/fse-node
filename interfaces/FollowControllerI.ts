/**
 * @file Declares API for follows related controller methods
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowsAnotherUser (req: Request, res: Response): void;
    userUnfollowsAnotherUser (req: Request, res: Response): void;
    findAllFollowing (req: Request, res: Response): void;
    findAllFollowers (req: Request, res: Response): void;
};