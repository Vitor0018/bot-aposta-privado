const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
  token: process.env.DISCORD_TOKEN,
  mongoUri: process.env.MONGO_URI,
  prefixes: ['!', '.'],
};

// Validate required env vars
if (!config.token) {
  console.error('❌ DISCORD_TOKEN não configurada. Defina a variável de ambiente DISCORD_TOKEN.');
  process.exit(1);
}

if (!config.mongoUri) {
  console.error('❌ MONGO_URI não configurada. Defina a variável de ambiente MONGO_URI.');
  process.exit(1);
}

module.exports = config;
