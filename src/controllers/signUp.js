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
            const message = validateUser(newUser).details[0].message;
            if(message.includes("name")) return res.status(400).send('Nome deve ter no máximo 30 caracteres');
            if(message.includes("email")) return res.status(400).send('Insira um email válido');
            if(message.includes("password")) return res.status(400).send('A senha deve ter no mínimo 6 caracteres');
        }

        const users = await connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        const user = users.rows[0];
        if(user) {
            return res.status(409).send("Esse email já esta cadastrado.");
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hashPassword]);
        res.status(201).send("Sua conta foi criada com sucesso.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro no nosso sistema, tente novamente mais tarde.");
    }
}

export {
    signUp
}