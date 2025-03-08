const express = require('express');
// Import the routes for teams
const router = express.Router();
const {createTeam, getTeams} = require('../controllers/teamController.js');

router.post('/', createTeam);
router.get('/', getTeams);

// Export the router
module.exports = router; 
