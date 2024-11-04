// app.js
const express = require('express');
const app = express();
const commentRoutes = require('./routes/commentRoutes');
const matchRoutes = require('./routes/matchRoutes');
const playerRoutes = require('./routes/playerRoutes');

app.use(express.json());

app.use('/api/comments', commentRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/players', playerRoutes);

module.exports = app;
