/**
 * @file Declares API for messages related controller methods
 */
import {Request, Response} from "express";

export default interface MessageControllerI {
    sendMessage (req: Request, res: Response): void;
    findAllSentMessages (req: Request, res: Response): void;
    findAllReceivedMessages (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
};