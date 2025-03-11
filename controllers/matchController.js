const Match = require('../models/matchModel');
const mongoose = require('mongoose');

//Create new match
const createMatch = async (req, res) => {
    const match = new Match(req.body);
    try {
        await match.save();
        res.status(201).json(match);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Get all matches
const getMatches = async (req, res) => {
    try {
        const matches = await Match.find();
        if (matches.length === 0) {
            return res.status(404).json({ message: 'No matches found' });
        }

        res.status(200).json( matches )
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//Get match by ID
const getMatchById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid match ID' });
    }
    try {
        const match = await Match.findById(id);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Update match
const updateMatch = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid Team ID' });
    }
    try {
        await Match.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: 'Match Update successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Delete Match
const deleteMatch = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid Team ID' });
    }
    try{
        await Match.findByIdAndDelete(id);
        res.status(200).json({message:'Match deleted successfully'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = { createMatch, getMatches, getMatchById, updateMatch, deleteMatch };