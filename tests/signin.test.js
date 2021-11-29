import '../src/setup.js';
import supertest from "supertest";
import connection from "../src/database/database.js";
import app from "../src/app.js";

beforeAll(async () => {
    const body = {
        name: "signintester",
        email: "signintester@test.com",
        password: "signintester",
    };
    await supertest(app).post(`/sign-up`).send(body);
});

afterAll(async () => {
    const result = await connection.query(`SELECT * FROM users WHERE name = 'signintester';`);
    const {id} = result.rows[0];
    await connection.query(`DELETE FROM sessions WHERE user_id = $1;`, [id]);
    await connection.query(`DELETE FROM users WHERE name = 'signintester';`);
    connection.end();
  });

describe(`POST /sign-in`, () => {

    it(`returns 401 for invalid email`, async () => {
        const body = {
            email: "wrongEmail@test.com",
            password: "signintester",
        };
        const result = await supertest(app).post(`/sign-in`).send(body);
        const status = result.status;
        expect(status).toEqual(401);
    });

    it(`returns 401 for invalid password`, async () => {
        const body = {
            email: "signintester@test.com",
            password: "wrongPassword",
        };
        const result = await supertest(app).post(`/sign-in`).send(body);
        const status = result.status;
        expect(status).toEqual(401);
    });

    it(`returns 200 and an object containing name and token params`, async () => {
        const body = {
            email: "signintester@test.com",
            password: "signintester",
        };
        const result = await supertest(app).post(`/sign-in`).send(body);
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty(`token`);
        expect(result.body).toHaveProperty(`name`, `signintester`);

    });
});