const express = require('express');
const app = express();
const pool = require('./config/db');
const PORT = process.env.PORT || 3002
const errorHandler = require('./middleware/errorHandler');

const patientRoute = require('../src/routes/patients.routes');
const visitRoute = require('../src/routes/visits.routes');
const { initModels } = require('./models');
const setupSwagger = require('./docs/swagger');

app.use(express.json());
app.use('/api', patientRoute);
app.use('/api', visitRoute);

app.use(errorHandler);
setupSwagger(app); 

let server;
const startServer = async () => {
    try {
        const [rows] = await pool.query(`SELECT NOW() AS now`);
        console.log("MySQL Test Query result: ", rows[0]);

        app.get('/health', (req, res) => {
            res.send("Node.js + MySQL connecté et initialisé !!!");
        });

        await initModels();

        server = app.listen(PORT, '0.0.0.0', () => {
            console.log("###: Serveur lancé sur http://localhost:"+PORT);
        });
        return server;
    } catch (error) {
        console.error("###: Erreur de démarrage du serveur ! ");
    }
};

const closeServer = async () => {
    try {
        if (server) {
            await new promise(resolve => server.close(resolve));
            console.log("#: Server HTTP fermé.");
        }
        await pool.end();
        console.log("#: Pool MySQL fermé.");
    } catch (error) {
        console.error('##: Erreur lors de la fermeture du serveur/pool MySQL: ', error.message);
    }
}

module.exports = {app, startServer, closeServer, pool};