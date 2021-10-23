import connection from "../database/database.js";


export async function postEntry (req, res) {
    const {
        description,
        value,
        date
    } = req.body;
    const token = req.headers.authorization.replace('Bearer ', '');

    try {
        const user = await connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
        
        if (user.rowCount === 0){
            return res.sendStatus(401);
        }

        const userId = JSON.stringify(user.rows[0].userId);
        await connection.query(`INSERT INTO entries ("userId", description, date, value) VALUES ($1, $2, $3, $4);`, [userId, description, date, value])
        return res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return sendStatus(500);
    }
}