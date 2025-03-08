const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the book collection
const tournamentSchema = new Schema({
    name: {type: String, required: true},
    logo:{type: String, default: 'defaultTournament.jpg'},
    time_start: {type: Date, default: Date.now},
    location: {type: String, required: true},
    description:{type: String, required: true},
    format:{type: String, enum: ["Group Stage", "Round-Robin"], required: true},
    number_of_member:{type:Number,required: true},
    number_of_rounds:{type: Number, required: true},
    number_of_team_advances:{type:Number},
    number_of_teams: {type:Number, required: true},
    teams:[{type: mongoose.Schema.Types.ObjectId,ref:'Team'}],
    createdBy: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
    createdAt:{type: Date, required: true, default: Date.now},
    
})

module.exports = mongoose.model('Tournament', tournamentSchema);