import {Request, Response} from "express";

export default interface DislikeControllerI {
    userDislikesTuit(req: Request, res: Response): void;
    userUndislikesTuit(req: Request, res: Response): void;
    userTogglesTuitDislikes(req: Request, res: Response): void;
    findAllTuitsDislikedByUser(req: Request, res: Response): void;
};