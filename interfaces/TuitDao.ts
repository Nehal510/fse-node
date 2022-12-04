/**
 * @file Declares API for tuits related data access object methods
 */
import Tuit from "../models/Tuit";
import Stats from "../models/Stats";

export default interface TuitDao {
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(uid: string): Promise<any>;
    findTuitById(tid: string): Promise<Tuit>;
    //createTuit(tuit: Tuit): Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;
    createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit>;
    updateLikes(tid: string, newStats: any): Promise<any>;
    updateStats(tid: string, newStats: Stats): Promise<any>;
}

