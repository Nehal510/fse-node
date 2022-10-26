/**
 * @file DAO RESTful Web service API for messages resource
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

/**
 * @class MessageDao it implements the DAO for messages resource
 * @property {MessageDao} messageDao private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Singleton DAO instance
     * @returns messageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    /**
     * Sends message from one user to another
     * @param uid user id of the user from whom the message is sent
     * @param uid1 is the user id the user to whom the message is sent
     * @param message that is the message to be sent
     * @returns {Promise} of message
     */
    sendMessage = async (uid: string, uid1: string, message: string): Promise<Message> =>
        MessageModel.create({sentBy : uid, sentTo: uid1, message: message});
    /**
     * Retrieves all sent messages by a user
     * @param uid user id of the user for whom sent messages have to be retrieved
     * @returns {Promise} of message array
     */
    findAllSentMessages = async (uid: string): Promise<Message[]> =>
        MessageModel.find({sentBy: uid}).populate("message").exec();
    /**
     * Retrieves all received messages by a user
     * @param uid user id of the user for whom received messages have to be retrieved
     * @returns {Promise} of message array
     */
    findAllReceivedMessages = async (uid: string): Promise<Message[]> =>
        MessageModel.find({sentTo: uid}).populate("message").exec();
    /**
     * Deletes a message
     * @param mid message id of the message which needs to be deleted
     * @returns {Promise} of any
     */
    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}