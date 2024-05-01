const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    isAdmin: Boolean,
    status: {
        type: String,
        default: 'Active'
    },
    loginTries: {
        type: Number,
        default: 0
    },
    blockTime: Number
})


module.exports = UserSchema;