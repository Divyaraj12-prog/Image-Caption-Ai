const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('../src/routes/post.routes');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'https://image-caption-ai-three.vercel.app/',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);

module.exports = app