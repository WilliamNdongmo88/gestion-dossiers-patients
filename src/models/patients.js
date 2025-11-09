const pool  = require('../config/db');
const bcrypt = require('bcryptjs');

const  initTablePatient = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS patients(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(100) NOT NULL,
        prenom VARCHAR(100) NOT NULL,
        date_naissance DATE NOT NULL,
        numero_securite_sociale VARCHAR(255) NOT NULL,
        nss_masker VARCHAR(100),
        date_creation DATETIME DEFAULT CURRENT_TIMESTAMP 
    )`
    );
    console.log('###: Table patients créé !' );
};

async function createPatients(nom, prenom, dateNaissance, numeroSecuriteSociale) {
    const hashedNumeroSecuriteSociale = await bcrypt.hash(numeroSecuriteSociale, 10);
    const nss = numeroSecuriteSociale.replace(/\D/g, '');
    const nssMasker = nss.replace(/\d(?=\d{5})/g, '*');
    console.log('nssMasker:', nssMasker);
    const result = await pool.query(`INSERT INTO patients (nom, prenom, date_naissance, 
        numero_securite_sociale, nss_masker) VALUES(?,?,?,?,?)
        `,[nom, prenom, dateNaissance, hashedNumeroSecuriteSociale, nssMasker]);

    return result[0].insertId || null;
};

async function getStatsPatient() {
    const result = await pool.query(`
        SELECT 
            COUNT(*) AS total_patients,
            FROM_DAYS(AVG(TO_DAYS(date_naissance))) AS moyenne_date_naissance
        FROM patients
    `);
    return result[0];
}

async function getPatientById(patientId) {
    const result = await pool.query(`SELECT * FROM patients WHERE id=?`, [patientId]);
    return result[0];
}

async function updatePatientById(patientId, nom, prenom, dateNaissance) {
    await pool.query(`UPDATE patients SET nom=?, prenom=?, date_naissance=? WHERE id=?`,
        [nom, prenom, dateNaissance, patientId]
    );
}

module.exports = {initTablePatient, createPatients, getPatientById, 
    updatePatientById, getStatsPatient
};