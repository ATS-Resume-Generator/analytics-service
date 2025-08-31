const mongoose = require('mongoose');
const { Metric } = require('../models/Metric');
const { Event } = require('../models/Event');
const { Alert } = require('../models/Alert');

const checkSystemHealth = async () => {
    try {
        // Check database connection
        await mongoose.connection.db.admin().ping();
        const metricsCount = await Metric.countDocuments();
        const eventsCount = await Event.countDocuments();
        const alertsCount = await Alert.countDocuments();

        return {
            status: 'healthy',
            metricsCount,
            eventsCount,
            alertsCount,
        };
    } catch (error) {
        return {
            status: 'unhealthy',
            error: error.message,
        };
    }
};

const checkServiceHealth = async (serviceName) => {
    // Placeholder for service-specific health checks
    // Implement service-specific logic here
    return {
        service: serviceName,
        status: 'healthy',
    };
};

module.exports = {
    checkSystemHealth,
    checkServiceHealth,
};