import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
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
    async findTuitById(tid: string): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.findById(tid);
        return new Tuit(
            tuitMongooseModel?._id.toString()??'',
            tuitMongooseModel?.tuit??'',
        );
    }
    async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id??'',
            tuitMongooseModel?.tuit??'',
        );
    }
    async deleteTuit(tid: string):  Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: {
            tuit: tuit.tuits,
            }});
    }
    async findTuitsByUser(uid: string): Promise<any>{
        const tuitMongooseModel = await TuitModel.findById(uid);
        return new Tuit(
            tuitMongooseModel?._id.toString()??'',
            tuitMongooseModel?.tuit??'',
        );
    }
}

