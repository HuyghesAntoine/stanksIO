const path = require('path');
const sqlite3 = require('better-sqlite3');
//try to connect to the database
exports.connect = () => new sqlite3(
    path.join(__dirname,'../db/game.db')
)