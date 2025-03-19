const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const matchValidation = require('../validations/matchValidation');


router.put('/update-match-round/:id', matchController.updateMatchForRound);

router.put('/:id', matchController.updateMatch2);

router.post('/generate-match-round', matchController.createMatchRound);

router.delete('/:id', matchController.deleteMatch);

router.get('/', matchController.getMatches);

router.get('/:id', matchController.getMatchesByTournamentId);


module.exports = router;
