const mongoose = require('mongoose');

const teamSchema  = new mongoose.Schema({
    name: {type: String, required: true},
    logo: {type: String, default: 'defaultClub.jpg'},
    description: {type: String},
    location: {type: String},
    players: [{type: mongoose.Schema.Types.ObjectId, ref:'Player'}],
    jersey_color: [{type: String, default: '#FFFFFF'}],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    createdAt: {type: Date, required: true, default: Date.now},
})

module.exports = mongoose.model('Team', teamSchema);