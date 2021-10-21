import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { v4 as generateToken } from 'uuid';

async function signIn(req, res) {
    const {
        email,
        password
    } = req.body;

    try {
        const users = await connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        const user = users.rows[0];
        if(!user) {
            return res.sendStatus(404);
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if(!isPasswordCorrect) {
            return res.sendStatus(401);
        }

        const token = generateToken();
        await connection.query(`
            INSERT INTO sessions (token, "userId") VALUES ($1, $2);
        `, [token, user.id]);

        res.status(200).send(token);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    signIn
}