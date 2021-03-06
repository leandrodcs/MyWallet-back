import connection from "../database/database.js";

async function getTransactions(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
        const transactions = await connection.query(`
            SELECT transactions.id, transactions.date, transactions.description, transactions.value FROM sessions
            JOIN transactions
            ON sessions.user_id = transactions.user_id
            WHERE sessions.token = $1;
        `, [token]);

        res.status(200).send(transactions.rows);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    getTransactions,
}