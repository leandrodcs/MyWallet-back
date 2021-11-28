import dayjs from 'dayjs';
import 'dayjs/locale/pt-br.js';
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

        if(validateEntry(newEntry)) return res.status(400).send("Preencha os campos corretamente.");

        const users = await connection.query(`
            SELECT users.id FROM sessions
            JOIN users
            ON sessions.user_id = users.id
            WHERE sessions.token = $1;
        `, [token]);

        const userId = users.rows[0].id;
        if (!userId) return res.status(404).send("Suas credenciais expiraram.");

        await connection.query(`
        INSERT INTO transactions (user_id, date, description, value) VALUES ($1, $2, $3, $4);
        `, [userId, dayjs().locale('pt-br').format('YYYY-MM-DD'), description, value]);

        res.status(201).send("Sua movimentação foi cadastrada.");
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    registerTransaction,
}