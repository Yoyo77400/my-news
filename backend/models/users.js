const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String,
    canBookmark: Boolean,
});

const User = mongoose.model('User', userSchema);
module.exports = User;