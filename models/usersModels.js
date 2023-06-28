const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Users = new Schema({
    username: {
        type: String,
        required: [true, "please enter a username"]
    },
    password: {
        type: String,
        required: [true, "please enter a password"]
    }
})


module.exports = mongoose.model('Users', Users);