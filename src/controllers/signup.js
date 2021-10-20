import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { validateUser } from "../validations/validations.js";

async function signUp(req, res) {
    const newUser = req.body;
    const {
        name,
        email,
        password
    } = req.body;

    try {
        if(validateUser(newUser)) {
            return res.sendStatus(400);
        }

        const users = await connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        const user = users.rows[0];
        if(user) {
            return res.sendStatus(409);
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hashPassword]);
        res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    signUp
}