const express = require('express');
const router = express.Router();

const  tournamentController = require('../controllers/tournamentController');
const tournamentValidation = require('../validations/tournamentValidation');

router.post('/', tournamentValidation, tournamentController.createTournament);

router.put('/:id', tournamentValidation, tournamentController.updateTournament);

router.get('/', tournamentController.getTournaments);

router.get('/:id', tournamentController.getTournamentById);

router.delete('/:id', tournamentController.deleteTournament);

module.exports = router;