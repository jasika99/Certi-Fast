const Hierarchy = require('../models/Hierarchy');


exports.setHierarchy = async (req, res) => {
  const { levels, titles } = req.body;
  try {
    const hierarchy = new Hierarchy({
      levels,
      titles,
    });

    await hierarchy.save();
    res.status(201).json({ message: 'Hierarchy saved successfully' });
  } catch (error) {
    console.error('Error saving hierarchy:', error);
    res.status(500).json({ message: 'Failed to save hierarchy' });
  }
};