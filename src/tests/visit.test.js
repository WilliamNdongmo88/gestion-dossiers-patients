process.env.NODE_ENV = "test";
require("dotenv").config({ path: ".env.test" });

const request = require('supertest');
const {app, startServer, closeServer} = require('../app');

let server;
let patientId;

describe("Visits API", () => {
    beforeAll(async () => {
        server = await startServer();
    });

    describe("Test visits", () => {
        const datas = [
            {
                nom:"Tankou",
                prenom:"Toma",
                dateNaissance:"1990-02-02",
                numeroSecuriteSociale:"1 90 34 123 321 22"
            },
            {
                nom:"Talla",
                prenom:"Alice",
                dateNaissance:"1998-08-08",
                numeroSecuriteSociale:"1 98 34 123 321 88"
            }
        ];

        test("Test creation patient", async () => {
            for (const key in datas) {
                const data = datas[key];

                const res = await request(app)
                .post('/api/patients').send(data);

                console.log('res ::', res.body);
                patientId = res.body.id;
                expect(res.status).toBe(200);
            };
        });

        test("Test creation visit", async () => {
            const visitData = {
                patientId: 1,
                visitDate: "2026-06-06",
                notes: "Consultation de routine annuelle. Tension normale, aucun symptôme particulier."
            };
            
            const res = await request(app)
            .post('/api/visits').send(visitData);

            console.log('### visits res::', res.body);
            expect(res.status).toBe(200);
            expect(res.body.patientId).toBe(1);
        });

        test("Test: recupération patient avec visites", async () => {
            const res = await request(app)
            .get(`/api/patients/1/visits`);

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
        });

        test("Test: recupération patient sans aucune visites", async () => {
            const res = await request(app)
            .get(`/api/patients/2/visits`);

            expect(res.status).toBe(409);
            // expect(res.body.length).toBe(0);
        });

        test("Test: recupération patient non existant", async () => {
            const res = await request(app)
            .get(`/api/patients/3/visits`);

            expect(res.status).toBe(404);
        });
    })

    afterAll(async () => {
        await closeServer();
    })
});