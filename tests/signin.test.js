import supertest from "supertest";
import connection from "../src/database/database.js";
import { app } from "../src/app.js";

afterAll(async () => {
    connection.end();
  });

describe(`POST /sign-in`, () => {

    it(`returns status 404`, async () => {
        const body = {
            email: "wrongEmail@email.com",
            password: "permanentTester",
        };
        const result = await supertest(app).post(`/sign-in`).send(body);
        const status = result.status;
        expect(status).toEqual(404);
    });

    it(`returns status 401`, async () => {
        const body = {
            email: "permanentTest@email.com",
            password: "wrongPassword",
        };
        const result = await supertest(app).post(`/sign-in`).send(body);
        const status = result.status;
        expect(status).toEqual(401);
    });

    it(`returns user name`, async () => {
        const body = {
            email: "permanentTest@email.com",
            password: "permanentTester",
        };
        const result = await supertest(app).post(`/sign-in`).send(body);
        expect(result.body.name).toEqual(`permanentTester`);
    });
});