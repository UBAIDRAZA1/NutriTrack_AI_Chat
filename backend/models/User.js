const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    activityLevel: String,
    dietaryRestrictions: { type: [String], default: ['halal'] },
    goal: String,
    dailyCalorieTarget: Number,
    medicalIssues: { type: [String], default: [] },
    dailySchedule: {
      wakeTime: String,
      sleepTime: String,
      mealTimes: [String],
    },
    budget: String,
    cookingSkill: String,
    bloodTests: {
      sugar: String,
      cholesterol: String,
      thyroid: String,
    },
    sleepStress: {
      sleep: String,
      stress: String,
    },
    favoriteCuisines: { type: [String], default: ['Pakistani'] },
    fasting: Boolean,
  },
  loggedMeals: [
    {
      name: String,
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      source: String,
      medicalSuitability: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  caloriesConsumed: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  caloriesBurned: { type: Number, default: 0 },
  weeklyData: [
    {
      day: String,
      calories: Number,
      goal: Number,
    },
  ],
  dietPlans: [
    {
      planName: String,
      date: { type: Date, default: Date.now },
      days: [
        {
          day: String,
          meals: [
            {
              name: String,
              calories: Number,
              protein: Number,
              carbs: Number,
              fat: Number,
              source: String,
              recipe: String,
              swaps: [String],
            },
          ],
          totalCalories: Number,
          macronutrientSplit: {
            protein: Number,
            carbs: Number,
            fat: Number,
          },
          groceryList: [String],
          cookingTips: String,
          monitoring: String,
          offlineSwaps: [String],
        },
      ],
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);