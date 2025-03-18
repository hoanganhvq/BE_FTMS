const Match = require('../models/matchModel');
const Group = require('../models/groupModel');
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



const updateMatch2 = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Tìm trận đấu hiện tại
      const existingMatch = await Match.findById(id);
      if (!existingMatch) {
        return res.status(404).json({ message: 'Match not found' });
      }
  
      // Xác định đội thắng dựa trên dữ liệu mới từ req.body
      const matchData = { ...req.body };
      const { scoreTeam1, scoreTeam2, penaltyTeam1, penaltyTeam2, yellowCardsTeam1, yellowCardsTeam2, redCardsTeam1, redCardsTeam2 } = matchData;
  
      let winner = null;
      if (scoreTeam1 > scoreTeam2) {
        winner = existingMatch.team1;
      } else if (scoreTeam2 > scoreTeam1) {
        winner = existingMatch.team2;
      } else if (penaltyTeam1 > penaltyTeam2) {
        winner = existingMatch.team1;
      } else if (penaltyTeam2 > penaltyTeam1) {
        winner = existingMatch.team2;
      }
      matchData.winner = winner ? winner._id : null;
  
      // Cập nhật trận đấu
      const updatedMatch = await Match.findByIdAndUpdate(
        id,
        matchData,
        { new: true }
      ).populate('team1 team2 group');
  
      // Tìm group liên quan
      const group = await Group.findById(updatedMatch.group);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      // Cập nhật stats cho team1 và team2
      const team1Stats = group.teams.find(t => t.team.toString() === updatedMatch.team1._id.toString());
      const team2Stats = group.teams.find(t => t.team.toString() === updatedMatch.team2._id.toString());
  
      if (team1Stats && team2Stats) {
        if (existingMatch.status !== 'Finished' && updatedMatch.status === 'Finished') {
          team1Stats.matchesPlayed += 1;
          team2Stats.matchesPlayed += 1;
          
        if (winner && winner._id.toString() === updatedMatch.team1._id.toString()) {
            team1Stats.wins += 1;
            team2Stats.losses += 1;
            team1Stats.points += 3;
          } else if (winner && winner._id.toString() === updatedMatch.team2._id.toString()) {
            team2Stats.wins += 1;
            team1Stats.losses += 1;
            team2Stats.points += 3;
          } else {
            team1Stats.draws += 1;
            team2Stats.draws += 1;
            team1Stats.points += 1;
            team2Stats.points += 1;
          }
        }
  
        team1Stats.goalsFor =  (scoreTeam1 || 0);
        team1Stats.goalsAgainst = (scoreTeam2 || 0);
        team2Stats.goalsFor =  (scoreTeam2 || 0);
        team2Stats.goalsAgainst =  (scoreTeam1 || 0);
  
        team1Stats.yellowCards =  (yellowCardsTeam1 || 0);
        team1Stats.redCards =  (redCardsTeam1 || 0);
        team2Stats.yellowCards =  (yellowCardsTeam2 || 0);
        team2Stats.redCards =  (redCardsTeam2 || 0);
  
  
        group.updatedAt = new Date();
        await group.save();
      }
  
      res.status(200).json(updatedMatch);
    } catch (error) {
      res.status(500).json({ message: error.message || 'Failed to update match' });
    }
  };

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

const getMatchesByTournamentId = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid tournament ID'});
    }
    try{
        const match = await Match.find({tournament: id}).populate('team1').populate('team2').populate('group');
        res.status(200).json(match);
        console.log('Match data', match);
    }catch(error){
        res.status(500).json({message: error.message});
    }   
}
module.exports = { createMatch, getMatches, getMatchById, updateMatch,updateMatch2, deleteMatch, getMatchesByTournamentId };
