const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
connectDB();
console.log(process.env.JWT_SECRET)
const app = express();
app.use(express.json());

// Routes

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/player', require('./routes/playerRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/tournament', require('./routes/tournamentRoutes'));
app.use('/api/match', require('./routes/matchRoutes'));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));