const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const matchValidation = require('../validations/matchValidation');

router.put('/:id', matchController.updateMatch2);


router.post('/', matchValidation, matchController.createMatch);

router.delete('/:id', matchController.deleteMatch);

router.get('/', matchController.getMatches);

router.get('/:id', matchController.getMatchesByTournamentId);


module.exports = router;
