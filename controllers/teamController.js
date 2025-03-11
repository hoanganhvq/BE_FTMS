const Team = require('../models/teamModel');
const mongoose = require('mongoose');
// get all teams
const getTeams = async (req,res) =>{
    try{
        const teams = await Team.find();
        if(teams.length === 0){
            return res.status(404).json({message: "Team not found"});
        }
        return res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//getTeamById
const getTeamById =async(req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:'Invalid Team ID'});
    }
    try{
        const team = await Team.findById(id);
        if(!team){
            return res.status(404).json({message:'Team not found'});
        }
        return res.status(200).json(team);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


//createTeam
const createTeam = async(req, res) =>{
    const team = new Team(req.body);
    try{
        await team.save();
        res.status(201).json(team);
    } catch (error){
        res.status(500).json({message: error.message});
    }
}

// update team
const updateTeam = async(req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:'Invalid Team ID'});
    }

    try{
        await Team.findByIdAndUpdate(id, req.body);
        res.status(200).json({message:'Team updated successfully'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// delete team
const deleteTeam = async(req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:'Invalid Team ID'});
    }
    try{
        await Team.findByIdAndDelete(id);
        res.status(200).json({message:'Team deleted successfully'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
// export
module.exports = {getTeams, createTeam, getTeamById, updateTeam, deleteTeam};