import connection from "../database/database.js";

async function signOut(req, res) {

    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
        if(!token) return res.status(401).send("Suas credenciais expiraram.");
        await connection.query(`DELETE FROM sessions WHERE token = $1`, [token]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
export {
    signOut,
}