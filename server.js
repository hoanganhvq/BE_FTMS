const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const cors = require('cors');
// Load environment variables
dotenv.config();
connectDB();
console.log(process.env.JWT_SECRET)
const app = express();
// ⚠️ Cho phép frontend (localhost:3000) gọi API
// CORS will make the API accessible from the frontend
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

  app.use(cookieParser());

app.use(express.json());
app.use(morgan('dev'));

// Routes

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/player', require('./routes/playerRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/tournament', require('./routes/tournamentRoutes'));
app.use('/api/match', require('./routes/matchRoutes'));
app.use('/api/group' , require('./routes/groupRoutes'));
app.use('/api/round', require('./routes/roundRoutes'));
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));