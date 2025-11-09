const { initTablePatient } = require("./patients")

const initModels = async () => {
    await initTablePatient();
};

module.exports = {initModels};