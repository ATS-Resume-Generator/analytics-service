const Alert = require('../models/Alert');

const createAlert = async (alertData) => {
    try {
        const alert = new Alert(alertData);
        await alert.save();
        return alert;
    } catch (error) {
        throw new Error('Error creating alert: ' + error.message);
    }
};

const getActiveAlerts = async () => {
    try {
        const alerts = await Alert.find({ active: true });
        return alerts;
    } catch (error) {
        throw new Error('Error retrieving active alerts: ' + error.message);
    }
};

module.exports = {
    createAlert,
    getActiveAlerts,
};