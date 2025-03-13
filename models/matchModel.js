const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    team1: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    team2: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    matchDate: { type: Date, required: true },
    matchTime: { type: String, required: true },
    scoreTeam1: { type: Number, default: 0 },
    scoreTeam2: { type: Number, default: 0 },
    matchVenue: { type: String, required: true },
    status: {
        type: String,
        enum: ['Scheduled', 'Finished', 'Cancelled'],
        default: 'Scheduled',
      },
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, required: true, default: Date.now },
})

module.exports = mongoose.model('Match', matchSchema);