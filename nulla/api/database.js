const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Supress Mongoose strictQuery deprecation warning
mongoose.set('strictQuery', false);

const wait = ms => new Promise(res => setTimeout(res, ms));

const connect = async (retries = 3, backoff = 2000) => {
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI não está configurada. Defina a variável de ambiente MONGO_URI.');
    process.exit(1);
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ MongoDB connected');
      return;
    } catch (err) {
      console.error(`❌ Mongo connection attempt ${attempt} failed:`, err.message);
      if (attempt < retries) {
        console.log(`↻ Retrying in ${backoff}ms...`);
        // exponential backoff
        await wait(backoff * attempt);
      } else {
        console.error('❌ All MongoDB connection attempts failed.');
        console.error('Tip: verifique MONGO_URI, usuário/senha, e whitelist de IPs no Atlas.');
        process.exit(1);
      }
    }
  }
};

module.exports = { connect };
