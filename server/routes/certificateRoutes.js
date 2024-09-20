
const express = require('express');
const router = express.Router();

// Simulated certificate data
const certificates = [
  { id: '123456', name: 'John Doe', status: 'Approved' },
  { id: '654321', name: 'Jane Smith', status: 'Pending' }
];

// Route to track certificate status by application number
router.get('/track/:applicationNumber', (req, res) => {
  const applicationNumber = req.params.applicationNumber;

  const certificate = certificates.find(cert => cert.id === applicationNumber);

  if (certificate) {
    res.status(200).json(certificate);
  } else {
    res.status(404).json({ error: 'Certificate not found' });
  }
});

module.exports = router;
