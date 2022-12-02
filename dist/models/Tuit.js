"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The below represents tuit model and structure.
 */
class Tuit {
    constructor(id, tuit) {
        this.id = '';
        this.tuit = '';
        this.postedOn = new Date();
        this.id = id;
        this.tuit = tuit;
    }
    get tuits() {
        return this.tuit;
    }
}
exports.default = Tuit;
//# sourceMappingURL=Tuit.js.map