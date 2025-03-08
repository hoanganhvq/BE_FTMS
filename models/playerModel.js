const mongoose = require('mongoose');

const playerSchema  = new mongoose.Schema({
    name: {type: String, required: true},
    avatar: {type: String, required: true, default: "defaultPlayer.jpg"},
    position: {type: String, required: true},
    number: {type: Number, required: true},
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
})

module.exports = mongoose.model('Player', playerSchema);