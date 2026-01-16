const { MongoClient } = require('mongodb');

let db;

const initDb = async () => {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not found in environment variables');
  }

  const client = new MongoClient(uri);
  await client.connect();

  db = client.db();
  console.log('MongoDB connected');
  console.log('Database name:', db.databaseName);

  return db;
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = {
  initDb,
  getDb
};
