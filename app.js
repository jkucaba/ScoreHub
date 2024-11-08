// app.js
const express = require('express');
const app = express();
const commentRoutes = require('./routes/commentRoutes');
const matchRoutes = require('./routes/matchRoutes');
const playerRoutes = require('./routes/playerRoutes');
const userRoutes = require('./routes/userRoutes');
const teamsRoutes = require('./routes/teamRoutes');

app.use(express.json());

app.use('/api/comments', commentRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamsRoutes);


module.exports = app;
