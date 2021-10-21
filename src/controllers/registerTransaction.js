import connection from "../database/database.js";
import { validateEntry } from "../validations/validations.js";

async function registerTransaction(req, res) {

    const token = req.headers.authorization?.replace('Bearer ', '');
    const newEntry = req.body;
    const {
        description,
        value
    } = req.body;

    try {

        if(!token) return res.sendStatus(401);
        if(validateEntry(newEntry)) return res.sendStatus(400);

        const users = await connection.query(`
            SELECT users.id FROM sessions
            JOIN users
            ON sessions."userId" = users.id
            WHERE sessions.token = $1;
        `, [token]);

        const userId = users.rows[0].id;
        if (!userId) return res.sendStatus(404);

        await connection.query(`
        INSERT INTO transactions ("userId", date, description, value) VALUES ($1, $2, $3, $4);
        `, [userId, new Date().toLocaleDateString(`pt-br`), description, value]);

        res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    registerTransaction,
}