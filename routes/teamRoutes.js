const express = require('express');
// Import the routes for teams
const router = express.Router();
const teamController = require('../controllers/teamController');
const teamValidation = require('../validations/teamValidation');

router.post('/', teamValidation, teamController.createTeam);

router.get('/', teamController.getTeams);

router.get('/:id', teamController.getTeamById);

router.put('/:id', teamValidation, teamController.updateTeam);

router.delete('/:id', teamController.deleteTeam);

router.post('/getMany', teamController.getTeamsById);

// Export the router
module.exports = router; 
