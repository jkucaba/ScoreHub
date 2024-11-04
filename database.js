const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config()

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
});


module.exports = {
    query: (text, params) => pool.query(text, params),
};