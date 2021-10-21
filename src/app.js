import express from 'express';
import cors from 'cors';

import { signUp } from './controllers/signUp.js';
import { signIn } from './controllers/signIn.js';
import { getUserData } from './controllers/getUserData.js';
import { getTransactions } from './controllers/getTransactions.js';
import { registerTransaction } from './controllers/registerTransaction.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post(`/sign-up`, signUp);

app.post(`/sign-in`, signIn);

//Get only the user's name and email
app.get(`/user`, getUserData);

app.get(`/transactions`, getTransactions);

app.post(`/transactions`, registerTransaction);

app.listen(4000);