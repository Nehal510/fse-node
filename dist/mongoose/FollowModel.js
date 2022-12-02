"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FollowSchema_1 = __importDefault(require("./FollowSchema"));
/**
 * The below  variable  is used to create follow model from its schema.
 */
const FollowModel = mongoose_1.default.model("FollowModel", FollowSchema_1.default);
exports.default = FollowModel;
//# sourceMappingURL=FollowModel.js.map