const express = require('express');
const router = express.Router();
const auth = require('./auth'); // Fixed path
const User = require('../models/User');

// Add a new meal plan
router.post('/add-plan', auth, async (req, res) => {
  try {
    const { planName, breakfast, lunch, dinner } = req.body;
    if (!planName || !breakfast || !lunch || !dinner) {
      return res.status(400).json({ message: 'Please provide planName, breakfast, lunch, and dinner.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newPlan = {
      planName,
      breakfast,
      lunch,
      dinner,
      date: new Date(),
    };

    user.dietPlans.push(newPlan);
    await user.save();

    res.json({ message: 'Plan added', dietPlans: user.dietPlans });
  } catch (err) {
    console.error('Error adding meal plan:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all meal plans for the user
router.get('/plans', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ dietPlans: user.dietPlans });
  } catch (err) {
    console.error('Error fetching meal plans:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;