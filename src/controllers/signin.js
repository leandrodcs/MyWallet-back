import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { validateUser } from "../validations/validations.js";

async function signIn(req, res) {
    const userLogging = req.body;
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
        res.sendStatus(200);
        // if(validateUser(newUser)) {
        //     return res.sendStatus(400);
        // }


        // const hashPassword = bcrypt.hashSync(password, 10);
        // await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hashPassword]);
        // res.sendStatus(201);

        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    signIn
}