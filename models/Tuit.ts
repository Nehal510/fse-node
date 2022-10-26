import User from "./User";

/**
 * The below represents tuit model and structure.
 */
export default class Tuit {
    private id: string = '';
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
    constructor(id: string, tuit: string){
        this.id = id;
        this.tuit = tuit;
    }
    get tuits()
    {
        return this.tuit;
    }
}

