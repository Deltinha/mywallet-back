import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import Joi from 'joi';

function inputlValidation(input){
    const inputSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    if (inputSchema.validate(input).error !== undefined){
        return false;
    }
    return true;
}

async function logIn (req, res) {
        const { email, password } = req.body;

        if (!inputlValidation({email, password})) {
            return res.sendStatus(400);
        }
        
        try {
            const result = await connection.query(`SELECT * FROM users WHERE email = $1`,[email]);
    
            const user = result.rows[0];

            if(user && bcrypt.compareSync(password, user.password)) {
                const token = uuid();
                
                await connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [user.id, token]);

                const responseBody = {
                    name: user.name,
                    token
                }
                
        
                return res.send(responseBody).status(200);
            } else {
                return res.sendStatus(401);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
}


export {logIn};