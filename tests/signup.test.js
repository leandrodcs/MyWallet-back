import '../src/setup.js';
import supertest from "supertest";
import connection from "../src/database/database.js";
import app from "../src/app.js";

afterAll(async () => {
    await connection.query(`DELETE FROM users WHERE email = 'signuptester@test.com';`);
    connection.end();
  });

describe(`POST /sign-up`, () => {

    it(`returns 400 for invalid body`, async () => {
        const body = {};
        const result = await supertest(app).post(`/sign-up`).send(body);
        const status = result.status;
        expect(status).toEqual(400);
    });

    it(`returns 201 for valid body`, async () => {
        const body = {
            name: "test",
            email: "signuptester@test.com",
            password: "password",
        };
        const result = await supertest(app).post(`/sign-up`).send(body);
        const status = result.status;
        expect(status).toEqual(201);
    });

    it(`returns 409 for email already registered on db`, async () => {
        const body = {
            name: "test",
            email: "signuptester@test.com",
            password: "password",
        };
        const result = await supertest(app).post(`/sign-up`).send(body);
        const status = result.status;
        expect(status).toEqual(409);
    });
});