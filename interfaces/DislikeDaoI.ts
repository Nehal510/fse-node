/**
 * @file Declares API for Dislikes related data access object methods
 */
import Dislike from "../models/Dislike";

export default interface DislikeDaoI {
    userDislikesTuit(uid: string, tid: string): Promise<Dislike>;
    userUndislikesTuit(uid: string, tid: string): Promise<any>;
    findUserDislikesTuit(uid: string, tid: string): Promise<Dislike>;
    countHowManyDislikedTuit(tid: string): Promise<any>;
    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;
};