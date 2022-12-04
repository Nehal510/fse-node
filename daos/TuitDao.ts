/**
 * @file DAO RESTful Web service API for tuits resource
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";
import Stats from "../models/Stats";


/**
 * @class TuitDao it implements the DAO for tuits resource
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null =null;

    public static getInstance = (): TuitDao =>{
        if(TuitDao.tuitDao === null){
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}
    /**
     * Retrieves all the tuits in the collection
     * @returns {Promise} of Tuit array
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Retrieves the tuit by id
     * @param tid of the tuit which needs to be retrieved
     * @returns {Promise} of Tuit type
     */
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }
    /**
     * Creates a new tuit
     * @param tuit details will go in the body
     * @returns {Promise} of Tuit type
     */
    /**
     * Deletes the tuit by id
     * @param tid of the tuit which needs to be deleted
     * @returns {Promise} of any type
     */
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
    /**
     * Updates the tuit by id
     * @param tid of the tuit which needs to be updated
     * @returns {Promise} of any type
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        // @ts-ignore
        return await TuitModel.updateOne({_id:tid}, {$set: tuit})
    }
    /**
     * Retrieves the tuits by user
     * @param uid of the user for whom the tuits need to be retrieved
     * @returns {Promise} of any type
     */
    /*async findTuitsByUser(uid: string): Promise<any>{
        const tuitMongooseModel = await TuitModel.findById(uid);
        return new Tuit(
            tuitMongooseModel?._id.toString()??'',
            tuitMongooseModel?.tuit??'',
        );
    }*/

    async createTuitByUser(uid: string, tuit: Tuit): Promise<any>{
        return await TuitModel.create({...tuit, postedBy: uid});
    }

    findTuitsByUser = async(uid: string): Promise<any> => {
        console.log("PostedBy" + uid);
        return await TuitModel.find({postedBy: uid}).populate('postedBy', 'username').exec();
    }

    async updateLikes (tid:string, newStats:any) :Promise<any> {
        console.log("In updateLikes DAO")
        return TuitModel.updateOne(
            {_id: tid},
            {$set: {stats: newStats}})
    }

    async updateStats(tid: string, newStats: Stats): Promise<any> {
        return TuitModel.updateOne({_id: tid},
            {$set: {stats: newStats}});
    }

}

