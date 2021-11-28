import express from 'express';
import cors from 'cors';

import { signUp } from './controllers/signUp.js';
import { signIn } from './controllers/signIn.js';
import { getTransactions } from './controllers/getTransactions.js';
import { registerTransaction } from './controllers/registerTransaction.js';
import { signOut } from './controllers/signOut.js';
import { deleteTransaction } from './controllers/deleteTransaction.js';
import checkToken from './middleware/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post(`/sign-up`, signUp);
app.post(`/sign-in`, signIn);
app.delete(`/sign-out`, checkToken, signOut);

app.get(`/transactions`, checkToken, getTransactions);
app.post(`/transactions`, checkToken, registerTransaction);



app.delete(`/transactions`, checkToken, deleteTransaction);

export default app;