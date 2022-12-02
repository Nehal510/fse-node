import User from "./User";
import mongoose from "mongoose";

/**
 * The below represents tuit model and structure.
 */
export default class Tuit {
    private id: string = '';
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel', required: true};
    constructor(id: string, tuit: string){
        this.id = id;
        this.tuit = tuit;
    }
    get tuits()
    {
        return this.tuit;
    }
}