"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tuit {
    constructor(id, tuit) {
        this.id = '';
        this.tuit = '';
        this.postedOn = new Date();
        this.postedBy = null;
        this.id = id;
        this.tuit = tuit;
    }
    get tuits() {
        return this.tuit;
    }
}
exports.default = Tuit;
