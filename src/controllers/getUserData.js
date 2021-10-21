import connection from "../database/database.js";

async function getUserData(req, res) {

    const token = req.headers.authorization?.replace('Bearer ', '');

    try {

        if(!token) return res.sendStatus(401);

        const result = await connection.query(`
            SELECT users.name, users.email FROM sessions
            JOIN users
            ON sessions."userId" = users.id
            WHERE sessions.token = $1;
        `, [token]);

        const user = result.rows[0];

        if(!user) return res.sendStatus(401);

        res.status(200).send(user);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    getUserData
}