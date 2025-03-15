const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const validateGroup = require('../validations/groupValidation');

router.get('/:id',groupController.getGroupsbyTournament);

router.post('/:id',validateGroup, groupController.addGroup);

router.put('/:id', groupController.updateGroup);


module.exports = router;