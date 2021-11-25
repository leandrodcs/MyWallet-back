import '../src/setup.js';
import supertest from "supertest";
import connection from "../src/database/database.js";
import app from "../src/app.js";

let token;

beforeAll(async () => {
    const body = {
        name: "transactionstester",
        email: "transactionstester@test.com",
        password: "transactionstester",
    };
    await supertest(app).post(`/sign-up`).send(body);
    const result = await supertest(app).post(`/sign-in`).send(body);
    token = result.body.token;
});

afterAll(async () => {
    const result = await connection.query(`SELECT * FROM users WHERE name = 'transactionstester';`);
    const {id} = result.rows[0];
    await connection.query(`DELETE FROM transactions WHERE user_id = $1;`, [id]);
    await connection.query(`DELETE FROM sessions WHERE user_id = $1;`, [id]);
    await connection.query(`DELETE FROM users WHERE name = 'transactionstester';`);
    connection.end();
});

describe(`POST /transactions`, () => {

    it(`returns 401 for no token on headers sent`, async () => {
        const body = {description: "Just a test", value: 123};
        const result = await supertest(app).post(`/transactions`).send(body);

        expect(result.status).toEqual(401);
    });

    it(`returns 400 for invalid body`, async () => {
        const body = {description: "", value: 123};
        const result = await supertest(app).post(`/transactions`).set('Authorization', `Bearer ${token}`).send(body);

        expect(result.status).toEqual(400);
    });

    it(`returns 201 for valid body and token`, async () => {
        const body = {description: "Just a test post", value: 123};
        const result = await supertest(app).post(`/transactions`).set('Authorization', `Bearer ${token}`).send(body);

        expect(result.status).toEqual(201);
    });
});

describe(`GET /transactions`, () => {

    it(`returns 401 for no token on headers sent`, async () => {
        const result = await supertest(app).get(`/transactions`);

        expect(result.status).toEqual(401);
    });

    it(`returns 200 and an array containing an object with the given properties and values`, async () => {
        const result = await supertest(app).get(`/transactions`).set('Authorization', `Bearer ${token}`);

        expect(result.status).toEqual(200);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    description: "Just a test post",
                    value: "123.00",
                })
            ])
        );
    });
});