import connection from "../database/database.js";

async function deleteTransaction(req, res) {
    console.log(req.headers.authorization);

    const token = req.headers.authorization?.replace('Bearer ', '');
    const {id} = req.body;

    try {

        if(!token) return res.status(401).send("Você não possui a chave de acesso.");

        const users = await connection.query(`SELECT sessions.user_id FROM sessions WHERE sessions.token = $1;`, [token]);
        const userId = users.rows[0].user_id;
        
        if (!userId) return res.status(404).send("Suas credenciais expiraram.");

        await connection.query(`DELETE FROM transactions WHERE id = $1;`, [id]);

        res.status(200).send("Sua movimentação foi removida.");
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro no nosso sistema, tente novamente mais tarde.");
    }
}

export {
    deleteTransaction,
}