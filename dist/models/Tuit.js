"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
class Tuit {
    constructor() {
        this.tuit = '';
        this.postedOn = new Date();
        this.postedBy = null;
    }
}
exports.default = Tuit;
;
//# sourceMappingURL=Tuit.js.map