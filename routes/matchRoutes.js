const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const matchValidation = require('../validations/matchValidation');

router.put('/:id', matchValidation, matchController.updateMatch);

router.get('/:id', matchController.getMatchById);

router.post('/', matchValidation, matchController.createMatch);

router.delete('/:id', matchController.deleteMatch);

router.get('/', matchController.getMatches);


module.exports = router;
