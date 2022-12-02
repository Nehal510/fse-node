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
/**
 * @file DAO RESTful Web service API for tuits resource
 */
const Tuit_1 = __importDefault(require("../models/Tuit"));
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * @class TuitDao it implements the DAO for tuits resource
 */
class TuitDao {
    constructor() { }
    /**
     * Retrieves all the tuits in the collection
     * @returns {Promise} of Tuit array
     */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModel = yield TuitModel_1.default.find();
            const tuitModels = tuitMongooseModel
                .map((tuitMongooseModel) => {
                var _a, _b;
                return new Tuit_1.default((_a = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel.tuit) !== null && _b !== void 0 ? _b : '');
            });
            return tuitModels;
        });
    }
    /**
     * Retrieves the tuit by id
     * @param tid of the tuit which needs to be retrieved
     * @returns {Promise} of Tuit type
     */
    findTuitById(tid) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModel = yield TuitModel_1.default.findById(tid);
            return new Tuit_1.default((_a = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel.tuit) !== null && _b !== void 0 ? _b : '');
        });
    }
    /**
     * Creates a new tuit
     * @param tuit details will go in the body
     * @returns {Promise} of Tuit type
     */
    createTuit(tuit) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModel = yield TuitModel_1.default.create(tuit);
            return new Tuit_1.default((_a = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._id) !== null && _a !== void 0 ? _a : '', (_b = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel.tuit) !== null && _b !== void 0 ? _b : '');
        });
    }
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
            return yield TuitModel_1.default.updateOne({ _id: tid }, { $set: {
                    tuit: tuit.tuits,
                } });
        });
    }
    /**
     * Retrieves the tuits by user
     * @param uid of the user for whom the tuits need to be retrieved
     * @returns {Promise} of any type
     */
    findTuitsByUser(uid) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModel = yield TuitModel_1.default.findById(uid);
            return new Tuit_1.default((_a = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel.tuit) !== null && _b !== void 0 ? _b : '');
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