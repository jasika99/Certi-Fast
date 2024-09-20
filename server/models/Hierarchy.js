const mongoose = require('mongoose');

const hierarchySchema = new mongoose.Schema({
  levels: {
    type: Number,
    required: true,
  },
  titles: {
    type: [String],
    required: true,
  },
});

const Hierarchy = mongoose.model('Hierarchy', hierarchySchema);

module.exports = Hierarchy;