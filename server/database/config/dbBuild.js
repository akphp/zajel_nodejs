const { readFileSync } = require('fs');
const { join } = require('path');

const dbConnection = require('./dbConnection');

let sql = readFileSync(join(__dirname, 'dbBuild.sql')).toString();
sql += readFileSync(join(__dirname, 'dbFake.sql')).toString();

module.exports = () => dbConnection.query(sql);
