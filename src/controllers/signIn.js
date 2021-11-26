import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { v4 as generateToken } from 'uuid';
import { validateLogin } from "../validations/validations.js";

async function signIn(req, res) {
    const loginInfo = req.body;
    const {
        email,
        password
    } = req.body;

    try {
        if(validateLogin(loginInfo)) {
            return res.status(400).send("Os campos precisam ser preenchidos corretamente!");
        }
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
            INSERT INTO sessions (token, user_id) VALUES ($1, $2);
        `, [token, user.id]);

        res.status(200).send({
            name: user.name,
            email: user.email,
            password: user.password,
            token,
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    signIn
}