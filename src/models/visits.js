const pool = require('../config/db');

const initVisitModel = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS visits(
            id INT AUTO_INCREMENT PRIMARY KEY,
            patient_id INT NOT NULL,
            visit_date DATE NOT NULL,
            notes TEXT,
            FOREIGN KEY (patient_id) REFERENCES patients(id)
        )`
    );
    console.log("###: Table visits créé");
};

async function create(patientId, visitDate, notes) {
    const res = await pool.query(`INSERT INTO visits (patient_id, visit_date, notes) VALUES(?,?,?)`,
        [patientId, visitDate, notes]
    );
    return res.insertId;
};

async function getVisitsByPatientId(patientId) {
    const res = await pool.query(`SELECT * FROM visits WHERE patient_id=?`, [patientId]);
    return res;
}

module.exports = {initVisitModel, create, getVisitsByPatientId};