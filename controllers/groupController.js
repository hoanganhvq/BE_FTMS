const Group = require('../models/groupModel');
const mongoose = require('mongoose');

//Get all groups of tournament
const getGroupsbyTournament = async (req, res) => {
    const { id } = req.params;
    try{
        const groups = await Group.find({tournament: id}).populate('teams');
        res.status(200).json(groups);
    }catch(error){
        res.status(500).json({message: error.message});

    }
}

//Add Group

const addGroup = async (req, res) => {
    const {id} = req.params
    try{
        const group = new Group({
            ...req.body,
            tournament: id
        });
        await group.save();
        res.status(201).json(group);
    }catch(error){  
        res.status(500).json({ message: error.message });
    }
}

const updateGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedGroup = await Group.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = {getGroupsbyTournament, addGroup, updateGroup};
