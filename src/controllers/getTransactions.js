import connection from "../database/database.js";

async function getTransactions(req, res) {

    const token = req.headers.authorization?.replace('Bearer ', '');

    try {

        if(!token) return res.sendStatus(401);

        const transactions = await connection.query(`
            SELECT transactions.description, transactions.value FROM sessions
            JOIN transactions
            ON sessions."userId" = transactions."userId"
            WHERE sessions.token = $1;
        `, [token]);

        res.status(200).send(transactions.rows);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    getTransactions
}