const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get tracked data
router.get('/get-data', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      profile: user.profile || {
        age: 30,
        gender: 'male',
        height: 170,
        weight: 70,
        activityLevel: 'moderate',
        dietaryRestrictions: ['halal'],
        goal: 'weight_loss',
        dailyCalorieTarget: 2000,
        medicalIssues: [],
        dailySchedule: { wakeTime: '07:00', sleepTime: '23:00', mealTimes: ['08:00', '13:00', '19:00'] },
        budget: 'medium',
        cookingSkill: 'basic',
        bloodTests: { sugar: '', cholesterol: '', thyroid: '' },
        sleepStress: { sleep: 'good', stress: 'moderate' },
        favoriteCuisines: ['Pakistani'],
        fasting: false,
      },
      loggedMeals: user.loggedMeals || [],
      caloriesConsumed: user.caloriesConsumed || 0,
      points: user.points || 0,
      caloriesBurned: user.caloriesBurned || 0,
      weeklyData: user.weeklyData || [
        { day: 'Mon', calories: 0, goal: 2000 },
        { day: 'Tue', calories: 0, goal: 2000 },
        { day: 'Wed', calories: 0, goal: 2000 },
        { day: 'Thu', calories: 0, goal: 2000 },
        { day: 'Fri', calories: 0, goal: 2000 },
        { day: 'Sat', calories: 0, goal: 2000 },
        { day: 'Sun', calories: 0, goal: 2000 },
      ],
      dietPlans: user.dietPlans || [],
    });
  } catch (err) {
    console.error('Error fetching tracked data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get weekly data
router.get('/weekly-data', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      weeklyData: user.weeklyData || [
        { day: 'Mon', calories: 0, goal: user.profile.dailyCalorieTarget || 2000 },
        { day: 'Tue', calories: 0, goal: user.profile.dailyCalorieTarget || 2000 },
        { day: 'Wed', calories: 0, goal: user.profile.dailyCalorieTarget || 2000 },
        { day: 'Thu', calories: 0, goal: user.profile.dailyCalorieTarget || 2000 },
        { day: 'Fri', calories: 0, goal: user.profile.dailyCalorieTarget || 2000 },
        { day: 'Sat', calories: 0, goal: user.profile.dailyCalorieTarget || 2000 },
        { day: 'Sun', calories: user.caloriesConsumed || 0, goal: user.profile.dailyCalorieTarget || 2000 },
      ],
    });
  } catch (err) {
    console.error('Error fetching weekly data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update tracked data
router.put('/update', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (req.body.profile) user.profile = { ...user.profile, ...req.body.profile };
    if (req.body.loggedMeals) user.loggedMeals = req.body.loggedMeals;
    if (req.body.caloriesConsumed) user.caloriesConsumed = req.body.caloriesConsumed;
    if (req.body.points) user.points = req.body.points;
    if (req.body.caloriesBurned) user.caloriesBurned = req.body.caloriesBurned;
    if (req.body.weeklyData) user.weeklyData = req.body.weeklyData;
    if (req.body.dietPlan) user.dietPlans.push(req.body.dietPlan);

    await user.save();
    res.json({ message: 'Data updated' });
  } catch (err) {
    console.error('Error updating tracked data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;