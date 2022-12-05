/*
import User from "./User";
import mongoose from "mongoose";
import Stats from "./Stats";


/!**
 * The below represents tuit model and structure.
 *!/
export default class Tuit {
    private id: string = '';
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel', required: true};
    stats: Stats;
    constructor(id: string, tuit: string){
        this.id = id;
        this.tuit = tuit;
    }
    get tuits()
    {
        return this.tuit;
    }
}*/

/**
 * The below represents tuit model and structure.
 */
import User from "./User";
export default class Tuit {
    tuit: string = '';
    postedOn: Date = new Date();
    postedBy: User | null = null;
};
