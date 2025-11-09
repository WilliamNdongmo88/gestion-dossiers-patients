const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require('dotenv').config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Gestion de Données de Santé",
            version: "1.0.0",
            description: "Documentation de l'API de Gestion de Données de Santé Simplifiée",
        },
        components: {
            schemas:{
                ReqDataPatient: {
                    type: "object",
                    properties: {
                        nom: {
                            type: "string",
                            example: "Talla",
                        },
                        prenom: {
                            type: "string",
                            example: "Alice"
                        },
                        dateNaissance: {
                            type: "string",
                            example: "2025-05-05"
                        },
                        numeroSecuriteSociale: {
                            type: "string",
                            example: "2 95 123 654 12"
                        }
                    }
                },
                ResDataPatient: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number",
                            example: 1,
                        },
                        nom: {
                            type: "string",
                            example: "Talla",
                        },
                        prenom: {
                            type: "string",
                            example: "Alice"
                        },
                        dateNaissance: {
                            type: "string",
                            example: "2025-05-05"
                        },
                        numeroSecuriteSociale: {
                            type: "string",
                            example: "2 95 123 654 12"
                        }
                    }
                },
                ReqDataVisite: {
                    type: "object",
                    properties: {
                        patientId: {
                            type: "number",
                            example: 1
                        },
                        visitDate: {
                            type: "string",
                            example: "2026-06-06"
                        },
                        notes: {
                            type: "string",
                            example: "Consultation de routine. RAS."
                        },
                    },
                },
                ResDataVisite: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number",
                            example: 1
                        },
                        patientId: {
                            type: "number",
                            example: 1
                        },
                        visitDate: {
                            type: "string",
                            example: "2026-06-06"
                        },
                        notes: {
                            type: "string",
                            example: "Consultation de routine. RAS."
                        },
                    },
                },
            }
        }
    },
    apis: ["./src/routes/*.js"],
};

const swaggerDocument = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("#: Swagger docs: http://localhost:"+process.env.PORT+"/api-docs");
}

module.exports = setupSwagger;