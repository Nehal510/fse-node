/**
 * @file Declares API for user related data access object methods
 */
import User from "../models/User";

export default interface UserDao {
    findAllUsers(): Promise<User[]>;
    findUserById(uid: string): Promise<any>;
    createUser(user: User): Promise<User>;
    updateUser(uid: string, user: User): Promise<any>;
    deleteUser(uid: string): Promise<any>;
    deleteUserByUsername(uname: string): Promise<any>;
    findUserByUsername(uname: string): Promise<any>;
}

