import mongoose from "mongoose";

/**
 * @typedef UserSchema Represents users
 * @property username represents the username
 * @property password represents the password
 * @property firstName  reprents first name of the user
 * @property lastName  represents last name of the user
 * @property email represents email of the user
 * @property acoountType represents the type of account of the user
 * @property maritalStatus represents the marital status of the user
 * @property dateOfBirth represents the date of birth of the user
 * @property location represents the location of the user
 */
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    }
}, {collection: 'users'});
export default UserSchema;
