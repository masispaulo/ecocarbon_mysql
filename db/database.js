const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'users.db');

const db = new sqlite3.Database(dbPath, err => {
  if (err) console.error('DB error:', err);
  else console.log('Connected to SQLite at', dbPath);
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

module.exports = db;
