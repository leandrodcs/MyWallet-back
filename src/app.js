import express from 'express';
import cors from 'cors';

import { signUp } from './controllers/signUp.js';
import { signIn } from './controllers/signIn.js';
import { getTransactions } from './controllers/getTransactions.js';
import { registerTransaction } from './controllers/registerTransaction.js';
import { signOut } from './controllers/signOut.js';
import { deleteTransaction } from './controllers/deleteTransaction.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post(`/sign-up`, signUp);

app.post(`/sign-in`, signIn);

app.get(`/transactions`, getTransactions);

app.post(`/transactions`, registerTransaction);

app.delete(`/sign-out`, signOut);

app.delete(`/transactions`, deleteTransaction);

export {
    app,
}