const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'POS_DB',
    password: '0990',
    port: 5432,
    idleTimeoutMillis: 500
});

const query = async (text, params) => {
    const res = await pool.query(text, params);
    return res;
};

module.exports = { query, pool };