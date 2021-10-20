import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
    user: 'postgres',
    password: '0909',
    host: 'localhost',
    port: 5432,
    database: 'my_wallet_db'
});

export default connection;