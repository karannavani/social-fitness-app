const express = require('express');
const router = express.Router();

const exerciseController = require('../controllers/exerciseController');

router.route('/exercises')
  .get(exerciseController.index);

module.exports = router;
