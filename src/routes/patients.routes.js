const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patients.controller');
const {body} = require('express-validator');
const validate = require('../middleware/validate');

router.post('/patients',
    [
        body('nom').notEmpty().withMessage('Le nom est obligatoire'),
        body('dateNaissance').notEmpty().withMessage('La date de naissance est obligatoire'),
        body('numeroSecuriteSociale').notEmpty().withMessage('Le numero de sécurité sociale est obligatoire')
    ],
    validate, patientController.addPatients);

router.get('/stats/patients', patientController.getAllPatient);
router.get('/patients/:id', patientController.getOnePatient);
router.get('/patients/:id/visits', patientController.getVisitsByPatient);

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
