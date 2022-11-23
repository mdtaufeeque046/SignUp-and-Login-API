const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String,
        required: true
    },


    password: {
        type: String,
        required: true
    },
    
    
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },

    userType: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },

});



let userModel= mongoose.model('user', userSchema);
module.exports = userModel;
 
