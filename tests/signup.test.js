import supertest from "supertest";
import connection from "../src/database/database.js";
import { app } from "../src/app.js";

afterAll(async () => {
    await connection.query(`DELETE FROM users WHERE email = 'signuptester@test.com';`);
    connection.end();
  });

describe(`POST /sign-up`, () => {

    it(`returns status 400`, async () => {
        const body = {};
        const result = await supertest(app).post(`/sign-up`).send(body);
        const status = result.status;
        expect(status).toEqual(400);
    });

    it(`returns status 201`, async () => {
        const body = {
            name: "test",
            email: "signuptester@test.com",
            password: "test",
        };
        const result = await supertest(app).post(`/sign-up`).send(body);
        const status = result.status;
        expect(status).toEqual(201);
    });

    it(`returns status 409`, async () => {
        const body = {
            name: "test",
            email: "signuptester@test.com",
            password: "test",
        };
        const result = await supertest(app).post(`/sign-up`).send(body);
        const status = result.status;
        expect(status).toEqual(409);
    });
});