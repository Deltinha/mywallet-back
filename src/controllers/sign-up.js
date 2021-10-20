import connection from "../database/database.js";
import bcrypt from 'bcrypt';

async function signUp (req, res) {
    const {
        name,
        email,
        password
    } = req.body;

    try {
        const result = await connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);

        if (result.rowCount !== 0) {
            return res.sendStatus(409);
        }

        const cryptedPass = bcrypt.hashSync(password, 10);
        
        await connection.query(`INSERT INTO users (name, email, password) VALUES ( $1, $2, $3);`,[name, email, cryptedPass]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);        
        res.sendStatus(500);
    }
}

export {signUp};