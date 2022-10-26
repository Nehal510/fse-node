/**
 * @file Declares API for messages related data access object methods
 */
import Message from "../models/Message";

export default interface MessageDaoI {
    sendMessage (uid: string, uid1: string, message: string): Promise<Message>;
    findAllSentMessages (uid: string): Promise<Message[]>;
    findAllReceivedMessages (uid: string): Promise<Message[]>;
    userDeletesMessage (mid: string): Promise<any>;
};