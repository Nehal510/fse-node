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
const MessageModel_1 = __importDefault(require("../mongoose/MessageModel"));
/**
 * @class MessageDao it implements the DAO for messages resource
 * @property {MessageDao} messageDao private single instance of MessageDao
 */
class MessageDao {
    constructor() {
        /**
         * Sends message from one user to another
         * @param uid user id of the user from whom the message is sent
         * @param uid1 is the user id the user to whom the message is sent
         * @param message that is the message to be sent
         * @returns {Promise} of message
         */
        this.sendMessage = (uid, uid1, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.create({ sentBy: uid, sentTo: uid1, message: message }); });
        /**
         * Retrieves all sent messages by a user
         * @param uid user id of the user for whom sent messages have to be retrieved
         * @returns {Promise} of message array
         */
        this.findAllSentMessages = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.find({ sentBy: uid }).populate("message").exec(); });
        /**
         * Retrieves all received messages by a user
         * @param uid user id of the user for whom received messages have to be retrieved
         * @returns {Promise} of message array
         */
        this.findAllReceivedMessages = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.find({ sentTo: uid }).populate("message").exec(); });
        /**
         * Deletes a message
         * @param mid message id of the message which needs to be deleted
         * @returns {Promise} of any
         */
        this.userDeletesMessage = (mid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteOne({ _id: mid }); });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
/**
 * Singleton DAO instance
 * @returns messageDao
 */
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
//# sourceMappingURL=MessageDao.js.map