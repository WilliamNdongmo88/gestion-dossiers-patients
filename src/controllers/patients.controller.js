const {createPatients, getPatientById, 
    updatePatientById, getStatsPatient} = require('../models/patients');

const addPatients = async (req, res, next) => {
    try {
        const {nom, prenom, dateNaissance, numeroSecuriteSociale} = req.body;
        const resultId = await createPatients(nom, prenom, dateNaissance, numeroSecuriteSociale);
        res.json({id:resultId, nom:nom, prenom:prenom, dateNaissance:dateNaissance});
    } catch (error) {
        next(error);
    }
};

const getAllPatient = async (req, res, next) => {
    try {
        const result  = await getStatsPatient();
        if(!result) return res.json({error: "Aucun patients non trouvé ! "});
        return res.json({result})
    } catch (error) {
        next(error)
    }
};

const getOnePatient = async (req, res, next) => {
    try {
        const result  = await getPatientById(req.params.id);
        if(!result) return res.json({error: "Patient non trouvé ! "});
        return res.json({nom:result[0].nom, prenom:result[0].prenom, dateNaissance:result[0].date_naissance, 
            numeroSecuriteSociale:result[0].nss_masker})
    } catch (error) {
        next(error)
    }
};

const updatePatient = async (req, res, next) => {
    try {
        let {nom, prenom, dateNaissance} = req.body;
        const patient  = await getPatientById(req.params.id);
        if(!patient[0]) return res.json({error: "Patient non trouvé ! "});
        if(nom == null) nom=patient[0].nom;
        if(prenom == null) prenom=patient[0].prenom;
        if(dateNaissance == null) dateNaissance=patient[0].date_naissance;
        await updatePatientById(req.params.id, nom, prenom, dateNaissance);
        return res.json({message: "Patient modifié avec succès !"})
    } catch (error) {
        next(error)
    }
}

module.exports = {addPatients, getAllPatient, getOnePatient, updatePatient};