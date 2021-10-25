import supertest from "supertest";
import app from "../src/app.js";
import connection from '../src/database/database.js';

describe('Sign-up test suit', () => {
    beforeEach( async ()=>{
        await connection.query(`DELETE FROM users WHERE name = 'supertest';`)
    })
    test ('returns 200 for sign-up with all required fields', async () => {
        const body = {
            name: 'supertest',
            email: 'super@test.com',
            password: 'st'
        }
        const result = await supertest(app).post('/sign-up').send(body);
        expect(result.status).toEqual(200);
    });

    test ('returns 400 for trying to sign-up with wrongly filled fields', async () => {
        const body = {
            name: '',
            email: 'supertestcom',
        }
        const result = await supertest(app).post('/sign-up').send(body);
        expect(result.status).toEqual(400);
    })

    test ('returns 409 when trying to sign-up with an already registered email', async () => {
        const body = {
            name: 'supertest',
            email: 'super@test.com',
            password: 'st'
        }
        await supertest(app).post('/sign-up').send(body);
        const result = await supertest(app).post('/sign-up').send(body);
        expect(result.status).toEqual(409);
    })
})

afterAll(() => {
    connection.end();
  });