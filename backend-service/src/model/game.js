let mongoose = require("mongoose")
let Schema = mongoose.Schema;

let gameSchema = new Schema({
    gameType: {
        type: String,
        required: true,
        enum: ['tictactoe']
    }
});

let Game = module.exports = mongoose.model('game', gameSchema);

module.exports.get = function (callback, limit) {
    Game.find(callback).limit(limit);
}
