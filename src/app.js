import express from 'express';
import cors from 'cors';

import { signUp } from './controllers/signup.js';
import { signIn } from './controllers/signin.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post(`/sign-up`, signUp);

app.post(`/sign-in`, signIn);

app.listen(4000);