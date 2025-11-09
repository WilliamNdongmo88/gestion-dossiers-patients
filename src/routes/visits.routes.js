const express = require('express');
const router = express.Router();
const VisitController = require('../controllers/visits.controller');

router.post('/visits', VisitController.createVisit);

module.exports = router;