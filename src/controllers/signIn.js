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
            return res.status(404).send("Este email não está cadastrado.");
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(401).send("A senha inserida está incorreta.");
        }
        const token = generateToken();
        await connection.query(`
            INSERT INTO sessions (token, "userId") VALUES ($1, $2);
        `, [token, user.id]);

        res.status(200).send({
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro no nosso sistema, tente novamente mais tarde.");
    }
}

export {
    signIn
}