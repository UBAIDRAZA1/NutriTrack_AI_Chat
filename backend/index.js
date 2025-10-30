const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const dietRoutes = require('./routes/diet');
app.use('/api/auth', authRoutes);
app.use('/api/diet', dietRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });

// ... existing code ...
const trackRoutes = require('./routes/track');
app.use('/api/track', trackRoutes);

});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));