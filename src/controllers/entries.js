import connection from "../database/database.js";
import dayjs from "dayjs";
import '../../node_modules/dayjs/locale/pt-br.js';


export async function postEntry (req, res) {
    dayjs.locale('pt-br');
    const {
        description,
        value,
        date
    } = req.body;

    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) return res.sendStatus(401);

    try {
        const user = await connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
        
        if (user.rowCount === 0){
            return res.sendStatus(401);
        }

        const userId = JSON.stringify(user.rows[0].userId);
        await connection.query(`INSERT INTO entries ("userId", description, date, value) VALUES ($1, $2, $3, $4);`, [userId, description, dayjs(date).format('YYYY-MM-DD'), value])
        return res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return sendStatus(500);
    }
}

export async function getEtries (req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) return res.sendStatus(401);

    try {
        const user = await connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
        
        if (user.rowCount === 0){
            return res.sendStatus(401);
        }

        const userId = JSON.stringify(user.rows[0].userId);
        const entries = await connection.query(`SELECT * FROM entries WHERE "userId" = $1 ORDER BY date DESC;`, [userId]);
        res.send(entries.rows).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}