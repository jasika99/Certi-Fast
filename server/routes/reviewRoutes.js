// routes/reviewerRoutes.js
const express = require('express');
const router = express.Router();
const reviewerController = require('../controllers/reviewerController');

// Route to handle form review (POST /review)
router.post('/review', reviewerController);

module.exports = router;
