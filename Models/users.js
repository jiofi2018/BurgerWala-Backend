const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    photo: String,
    role: {
        type: String,
        enum: ["admin","user"],
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
const User = mongoose.model("User",schema);
module.exports = User;