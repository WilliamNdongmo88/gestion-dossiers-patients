process.env.NODE_ENV = "test";
require("dotenv").config({ path: ".env.test" });

const request = require('supertest');
const {app, startServer, closeServer} = require('../app');

let server;
let patientId;

describe("Patients API", () => {
    beforeAll(async () => {
        server = await startServer();
    });

    describe("Patients API", () => {
        const patientBadData = {
            nom:"Tankou",
            prenom:"Toma",
            date_naissance:"1990-22-02",
            numero_securite_sociale:"1 90 34 123 321 22"
        };

        test("Test POST /api/patients - Resultat attendu 'Echec'", async () => {
            const res = await request(app)
            .post('/api/patients').send(patientBadData);

            console.log('res:', res.body);
            expect(res.status).toBe(400);
        });

        const patientData = {
            nom:"Tankou",
            prenom:"Toma",
            dateNaissance:"1990-02-22",
            numeroSecuriteSociale:"1 90 34 123 321 22"
        };
        test("Test POST /api/patients - Resultat attendu 'Succès'", async () => {
            const res = await request(app)
            .post('/api/patients').send(patientData);

            console.log('res:', res.body);
            patientId = res.body.id;
            expect(res.status).toBe(200);
            expect(res.body.nom).toBe("Tankou")
        });

        test("Test GET /api/patients/:id", async () => {
            const res = await request(app)
                .get(`/api/patients/${patientId}`);

            console.log("## res: ", res.body);
            expect(res.status).toBe(200);
            expect(res.body.numero_securite_sociale).toBe(undefined);
        });
    });

    afterAll(async () => {
        await closeServer();
    })
});