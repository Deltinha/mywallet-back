import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";


async function logIn (req, res) {
        const { email, password } = req.body;
        
        const result = await connection.query(`SELECT * FROM users WHERE email = $1`,[email]);
    
        const user = result.rows[0];
    
        try {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = uuid();
                
                await connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [user.id, token]);
        
                res.send(token).status(200);
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
}


export {logIn};