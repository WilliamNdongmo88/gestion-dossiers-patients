const { getPatientById } = require('../models/patients');
const {create} = require('../models/visits');

const createVisit = async (req, res, next) => {
    try {
        const {patientId, visitDate, notes} = req.body;
        const patient = await getPatientById(patientId);
        console.log('patient:', patient);
        if(!patient[0]) return res.status(404).json({error: "Patient non trouvé, impossible d'ajouter une visite"})
        const resultId = await create(patientId, visitDate, notes);
        return res.json({id: resultId, patientId: patientId, visitDate: visitDate, notes: notes});
    } catch (error) {
        next(error)
    }
};

module.exports = {createVisit};