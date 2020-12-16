let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});

let User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}
