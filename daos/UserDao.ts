/**
 * @file DAO RESTful Web service API for users resource
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * @class UserDao it implements the DAO for users resource
 */
export default class UserDao implements UserDaoI {
    /**
     * Retrieves all the users in the collection
     * @returns {Promise} of User array
     */
    async findAllUsers(): Promise<User[]> {
        const userMongooseModels = await UserModel.find();
        const userModels = userMongooseModels
            .map((userMongooseModel) => {
            return new User(
                userMongooseModel?._id.toString()??'',
                userMongooseModel?.username??'',
                userMongooseModel?.password??'',
            );
        });
        return userModels;
    }
    /**
     * Retrieves the user by id
     * @param uid of the user which needs to be retrieved
     * @returns {Promise} any
     */
    async findUserById(uid: string): Promise<any> {
        const userMongooseModel = await UserModel.findById(uid);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
        );
    }
    /**
     * Creates a new user
     * @param user details will go in the body
     * @returns {Promise} User
     */
    async createUser(user: User): Promise<User> {
        const userMongooseModel = await UserModel.create(user);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
        );
    }
    /**
     * Deletes a user
     * @param uid of the user which needs to be deleted
     * @returns {Promise} any
     */
    async deleteUser(uid: string):  Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }
    /**
     * Updates a user
     * @param uid of the user which needs to be updated
     * @returns {Promise} any
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: {
                username: user.uName,
                password: user.pass
            }});
    }
}

