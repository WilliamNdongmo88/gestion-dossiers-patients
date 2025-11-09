const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patients.controller');
const {body} = require('express-validator');
const validate = require('../middleware/validate');

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Gestion des patients
 */
/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Ajouter un nouveau patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:      
 *           schema:
 *             $ref: '#/components/schemas/ReqDataPatient'
 *     responses:
 *       201:
 *         description: Patient créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResDataPatient'
 *       400:
 *         description: Données invalides
 */
router.post('/patients',
    [
        body('nom').notEmpty().withMessage('Le nom est obligatoire'),
        body('dateNaissance').notEmpty().withMessage('La date de naissance est obligatoire'),
        body('numeroSecuriteSociale').notEmpty().withMessage('Le numero de sécurité sociale est obligatoire')
    ],
    validate, patientController.addPatients);

/**
 * @swagger
 * /api/stats/patients:
 *   get:
 *     summary: Récupère tous le nombre total de patients et la date de naissance moyenne des patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Patients récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/stats/patients', patientController.getAllPatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Récupère un patient via son Id
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du patient
 *     responses:
 *       200:
 *         description: Patient trouvé
 *       404:
 *         description: Patient introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get('/patients/:id', patientController.getOnePatient);

/**
 * @swagger
 * /api/patients/{id}/visits:
 *   get:
 *     summary: Récupérer les visites d’un patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du patient
 *     responses:
 *       200:
 *         description: Visite trouvé
 *       404:
 *         description: Aucune visite trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/patients/:id/visits', patientController.getVisitsByPatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Modifier un patient existant.
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du patient à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReqDataPatient'
 *     responses:
 *       200:
 *         description: Patient mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResDataPatient'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Patient introuvable
 *       500:
 *         description: Erreur serveur
 */
router.put('/patients/:id',
    [
        body('numeroSecuriteSociale').custom(value => {
            if (value && value.trim() !== '') {
                throw new Error('Le numéro de sécurité sociale ne peut pas être modifié');
            }
            return true;
        })
    ],
    validate, patientController.updatePatient);

module.exports = router;
