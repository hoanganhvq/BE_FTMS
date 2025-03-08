const Team = require('../models/teamModel');

// get all teams
const getTeams = async (req,res) =>{
    try{
        const teams = await Team.find();
        if(teams.length === 0){
            return res.status(404).json({message: "Không tìm thấy dữ liệu"});
        }
        return res.status(200).json(teams);
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
        res.status(400).json({message: error.message});
    }
}
// export
module.exports = {getTeams, createTeam};