"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageDao_1 = __importDefault(require("../daos/MessageDao"));
/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/sent to retrieve all sent messages by a user
 *     </li>
 *     <li>GET /api/users/:uid/received to retrieve all the received messages by a user
 *     </li>
 *     <li>POST /api/users/:uid/messages/:uid1 to send message from one user to another
 *     </li>
 *     <li>DELETE /api/messages/:mid to unsend or delete a message
 *     </li>
 * </ul>
 * @property {MessageDao} likeDao Singleton DAO implementing messsages CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API for messages resource
 */
class MessageController {
    constructor() {
        /**
         * User sends a message to another user
         * @param {Request} req Represents request from client, including the
         * path parameters uid and uid1 representing the user who is the sender of the message
         * and the user who is the receiver of the message and the message as body
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new message that was inserted in the
         * database
         */
        this.sendMessage = (req, res) => MessageController.messageDao.sendMessage(req.params.uid, req.params.uid1, req.body.message)
            .then(messages => res.json(messages));
        /**
         * Retrieves all the messages sent by a user
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user for whom the sent messages have to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the messages objects
         */
        this.findAllSentMessages = (req, res) => MessageController.messageDao.findAllSentMessages(req.params.uid)
            .then(messages => res.json(messages));
        /**
         * Retrieves all the messages received by a user
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user for whom the received messages have to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the messages objects
         */
        this.findAllReceivedMessages = (req, res) => MessageController.messageDao.findAllReceivedMessages(req.params.uid)
            .then(messages => res.json(messages));
        /**
         * User deletes a message or unsends it
         * @param {Request} req Represents request from client, including the
         * path parameters mid which is the message id of the message to be deleted
         * @param {Response} res Represents response to client, including status
         * on whether deleting the message was successful or not
         */
        this.userDeletesMessage = (req, res) => MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));
    }
}
exports.default = MessageController;
MessageController.messageDao = MessageDao_1.default.getInstance();
MessageController.messageController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return MessageController
 */
MessageController.getInstance = (app) => {
    if (MessageController.messageController === null) {
        MessageController.messageController = new MessageController();
        app.post("/api/users/:uid/messages/:uid1", MessageController.messageController.sendMessage);
        app.get("/api/users/:uid/sent", MessageController.messageController.findAllSentMessages);
        app.get("/api/users/:uid/received", MessageController.messageController.findAllReceivedMessages);
        app.delete("/api/messages/:mid", MessageController.messageController.userDeletesMessage);
    }
    return MessageController.messageController;
};
;
//# sourceMappingURL=MessageController.js.map