import connection from "../database/database.js";

export async function logOut (req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) return res.sendStatus(401);

    try {
        await connection.query(`DELETE FROM sessions WHERE token = $1;`, [token]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}