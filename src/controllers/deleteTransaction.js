import connection from "../database/database.js";

async function deleteTransaction(req, res) {
    const {id} = req.body;

    try {
        await connection.query(`DELETE FROM transactions WHERE id = $1;`, [id]);

        res.status(200).send("Sua movimentação foi removida.");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    deleteTransaction,
}