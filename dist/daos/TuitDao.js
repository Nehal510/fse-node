"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * @class TuitDao it implements the DAO for tuits resource
 */
class TuitDao {
    constructor() {
        this.findTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            console.log("PostedBy" + uid);
            return yield TuitModel_1.default.find({ postedBy: uid }).populate('postedBy', 'username').exec();
        });
    }
    /**
     * Retrieves all the tuits in the collection
     * @returns {Promise} of Tuit array
     */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.find();
        });
    }
    /**
     * Retrieves the tuit by id
     * @param tid of the tuit which needs to be retrieved
     * @returns {Promise} of Tuit type
     */
    findTuitById(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.findById(tid);
        });
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
    deleteTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.deleteOne({ _id: tid });
        });
    }
    /**
     * Updates the tuit by id
     * @param tid of the tuit which needs to be updated
     * @returns {Promise} of any type
     */
    updateTuit(tid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return yield TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
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
    createTuitByUser(uid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid }));
        });
    }
    updateLikes(tid, newStats) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("In updateLikes DAO");
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } });
        });
    }
    updateStats(tid, newStats) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } });
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
//# sourceMappingURL=TuitDao.js.map