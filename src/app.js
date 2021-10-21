import express from 'express';
import cors from 'cors';

import { signUp } from './controllers/signup.js';
import { signIn } from './controllers/signin.js';
import { getUserData } from './controllers/getUserData.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post(`/sign-up`, signUp);

app.post(`/sign-in`, signIn);

app.get(`/user`, getUserData);

app.listen(4000);