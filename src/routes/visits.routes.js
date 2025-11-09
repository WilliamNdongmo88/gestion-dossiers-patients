const express = require('express');
const router = express.Router();
const VisitController = require('../controllers/visits.controller');

/**
 * @swagger
 * tags:
 *   name: Visits
 *   description: Gestion des visites
 */
/**
 * @swagger
 * /api/visits:
 *   post:
 *     summary: Ajouter une nouvelle visite
 *     tags: [Visits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:      
 *           schema:
 *             $ref: '#/components/schemas/ReqDataVisite'
 *     responses:
 *       201:
 *         description: Patient créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResDataVisite'
 *       400:
 *         description: Données invalides
 */
router.post('/visits', VisitController.createVisit);

module.exports = router;