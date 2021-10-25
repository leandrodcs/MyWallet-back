import supertest from "supertest";
import connection from "../src/database/database.js";
import { app } from "../src/app.js";

beforeAll(async () => {
    const body = {
        name: "signintester",
        email: "signintester@test.com",
        password: "signintester",
    };
    await supertest(app).post(`/sign-up`).send(body);
});

afterAll(async () => {
    await connection.query(`DELETE FROM users WHERE name = 'signintester';`);
    connection.end();
  });

describe(`POST /sign-in`, () => {

    it(`returns status 404`, async () => {
        const body = {
            email: "wrongEmail@test.com",
            password: "signintester",
        };
        const result = await supertest(app).post(`/sign-in`).send(body);
        const status = result.status;
        expect(status).toEqual(404);
    });

    it(`returns status 401`, async () => {
        const body = {
            email: "signintester@test.com",
            password: "wrongPassword",
        };
        const result = await supertest(app).post(`/sign-in`).send(body);
        const status = result.status;
        expect(status).toEqual(401);
    });

    it(`returns user name`, async () => {
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