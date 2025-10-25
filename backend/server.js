const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

const users = {};

app.get('/api/auth/profile', (req, res) => {
  const userId = req.headers['x-auth-token'];
  if (!userId || !users[userId]) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json(users[userId]);
});

app.put('/api/track/update', (req, res) => {
  const userId = req.headers['x-auth-token'];
  if (!userId || !users[userId]) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  users[userId] = { ...users[userId], ...req.body };
  res.json({ message: 'Data updated' });
});

app.get('/api/track/weekly-data', (req, res) => {
  const userId = req.headers['x-auth-token'];
  if (!userId || !users[userId]) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ weeklyData: users[userId].weeklyData || [] });
});

// Dummy login for testing
app.post('/api/auth/login', (req, res) => {
  const userId = 'test-user';
  users[userId] = { profile: {}, loggedMeals: [], caloriesConsumed: 0, points: 0, caloriesBurned: 0, weeklyData: [] };
  res.json({ token: userId });
});

app.listen(5001, () => console.log('Server running on port 5001'));