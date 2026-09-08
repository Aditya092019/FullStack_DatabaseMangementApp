const express = require('express');
const router = express.Router();
const dbController = require('../controller/dbController');

router.post('/table',dbController.createTable);
router.post('/insert',dbController.createRecord)

module.exports = router;