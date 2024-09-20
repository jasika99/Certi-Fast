const express = require('express');
const { setHierarchy } = require('../controllers/officerController');
const router = express.Router();

router.post('/setHierarchy', setHierarchy);

module.exports = router;