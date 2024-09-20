const express = require('express');
const router = express.Router();
const Form = require('../models/form.model'); // Assuming form model is defined

// Route to handle form review (forward/reject)
router.post('/review', async (req, res) => {
  try {
    const { comment, status } = req.body;

    // You'd need to find the form based on some ID (e.g., req.body.formId) and update its status
    const form = await Form.findById(req.body.formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Update the form status and add the reviewer comment
    form.status = status;
    form.reviewerComment = comment;
    await form.save();

    res.status(200).json(`{ message: Form ${status} successfully! }`);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;