const { initTablePatient } = require("./patients");
const { initVisitModel } = require("./visits");

const initModels = async () => {
    await initTablePatient();
    await initVisitModel();
};

module.exports = {initModels};