const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const appRoutes = require('./routes/appRoutes');
const sequelize = require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', appRoutes);


sequelize.sync().then(() => {
  console.log('Database connected and models synced');
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}).catch(err => {
  console.error('Failed to connect to the database:', err);
});

