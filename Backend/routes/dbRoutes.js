const express = require('express');
const router = express.Router();
const dbController = require('../controller/dbController');

router.post('/table',dbController.createTable);
router.post('/insert',dbController.createRecord);
router.get("/records/:tableName",dbController.fetchRecords);
router.delete('/records/:tableName/:id', dbController.deleteRecord);

module.exports = router;