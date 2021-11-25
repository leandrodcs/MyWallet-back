import connection from "../database/database.js";

async function getTransactions(req, res) {

    const token = req.headers.authorization?.replace('Bearer ', '');

    try {

        if(!token) return res.status(401).send("Você não possui a chave de acesso.");

        const transactions = await connection.query(`
            SELECT transactions.id, transactions.date, transactions.description, transactions.value FROM sessions
            JOIN transactions
            ON sessions.user_id = transactions.user_id
            WHERE sessions.token = $1;
        `, [token]);

        res.status(200).send(transactions.rows);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro no nosso sistema, tente novamente mais tarde.");
    }
}

export {
    getTransactions,
}