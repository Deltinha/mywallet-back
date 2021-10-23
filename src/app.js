import express from 'express';
import cors from 'cors';
import { signUp } from './controllers/sign-up.js';
import { logIn } from './controllers/log-in.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);

app.post('/login', logIn);

export default app;

