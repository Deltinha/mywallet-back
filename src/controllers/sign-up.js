import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import Joi from 'joi';

function bodyValidation(body){
    const bodySchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
    })

    if (bodySchema.validate(body).error !== undefined){
        return false;
    }
    return true;
}

async function signUp (req, res) {
    if (!bodyValidation(req.body)) {
        return res.sendStatus(400);
    }

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