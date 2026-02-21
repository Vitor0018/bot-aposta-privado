const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  token: process.env.DISCORD_TOKEN,
  mongoUri: process.env.MONGO_URI,
  prefixes: ['!', '.'],
};
