const Tournament = require('../models/tournamentModel');
const mongoose = require('mongoose');

//Get all tournament 
const getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        if (tournaments.length === 0) {
            return res.status(404).json({ message: 'Not found tournament' });
        }
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Get Tournament by ID
const getTournamentById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid Tournament Id' })
    }
    try {
        const tournament = await Tournament.findById(id);
        if (!tournament) {
            return res.status(404).json({ message: 'Not found tournament' });
        }

        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//Create tournament
const createTournament = async (req, res) => {
    const tournament = new Tournament(req.body);
    try {
        await tournament.save();
        res.status(201).json(tournament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//updateTournament 
const updateTournament = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid Tournament Id' })
    }
    try {
        await Tournament.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: 'Tournament updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Delete Tournament 
const deleteTournament = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid Tournament Id' })
    }
    try {
        await Tournament.findByIdAndDelete(id);
        res.status(200).json({ message: 'Tournament deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {getTournaments, getTournamentById, createTournament, updateTournament, deleteTournament}