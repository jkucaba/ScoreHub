// app.js
const express = require('express');
const app = express();
const commentRoutes = require('./routes/commentRoutes');
const matchRoutes = require('./routes/matchRoutes');
const playerRoutes = require('./routes/playerRoutes');
const userRoutes = require('./routes/userRoutes');
const teamsRoutes = require('./routes/teamRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const commentMatchRoutes = require('./routes/commentMatchRoutes');
const leagueTableRoutes = require('./routes/leagueTableRoutes');
const lineupRoutes = require('./routes/lineupRoutes');
const matchEventRoutes = require('./routes/matchEventRoutes');
const ratingMatchRoutes = require('./routes/ratingMatchRoutes');
const ratingPlayerRoutes = require('./routes/ratingPlayerRoutes');
const teamLeagueTableRoutes = require('./routes/teamLeagueTableRoutes');

app.use(express.json());

app.use('/api/comments', commentRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/comment-matches', commentMatchRoutes);
app.use('/api/league-tables', leagueTableRoutes);
app.use('/api/lineups', lineupRoutes);
app.use('/api/match-events', matchEventRoutes);
app.use('/api/rating-matches', ratingMatchRoutes);
app.use('/api/rating-players', ratingPlayerRoutes);
app.use('/api/team-league-tables', teamLeagueTableRoutes);


module.exports = app;
