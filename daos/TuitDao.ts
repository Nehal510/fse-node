/**
 * @file DAO RESTful Web service API for tuits resource
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

/**
 * @class TuitDao it implements the DAO for tuits resource
 */
export default class TuitDao implements TuitDaoI {
    /**
     * Retrieves all the tuits in the collection
     * @returns {Promise} of Tuit array
     */
    async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModel = await TuitModel.find();
        const tuitModels = tuitMongooseModel
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString()??'',
                    tuitMongooseModel?.tuit??'',
                );
            });
        return tuitModels;
    }
    /**
     * Retrieves the tuit by id
     * @param tid of the tuit which needs to be retrieved
     * @returns {Promise} of Tuit type
     */
    async findTuitById(tid: string): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.findById(tid);
        return new Tuit(
            tuitMongooseModel?._id.toString()??'',
            tuitMongooseModel?.tuit??'',
        );
    }
    /**
     * Creates a new tuit
     * @param tuit details will go in the body
     * @returns {Promise} of Tuit type
     */
    async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id??'',
            tuitMongooseModel?.tuit??'',
        );
    }
    /**
     * Deletes the tuit by id
     * @param tid of the tuit which needs to be deleted
     * @returns {Promise} of any type
     */
    async deleteTuit(tid: string):  Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
    /**
     * Updates the tuit by id
     * @param tid of the tuit which needs to be updated
     * @returns {Promise} of any type
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: {
            tuit: tuit.tuits,
            }});
    }
    /**
     * Retrieves the tuits by user
     * @param uid of the user for whom the tuits need to be retrieved
     * @returns {Promise} of any type
     */
    async findTuitsByUser(uid: string): Promise<any>{
        const tuitMongooseModel = await TuitModel.findById(uid);
        return new Tuit(
            tuitMongooseModel?._id.toString()??'',
            tuitMongooseModel?.tuit??'',
        );
    }
}

