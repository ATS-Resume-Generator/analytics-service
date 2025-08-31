const express = require('express');
const router = express.Router();
const healthMonitor = require('../services/healthMonitor');

// GET /health/system - Overall system health status
router.get('/system', async (req, res) => {
    try {
        const healthStatus = await healthMonitor.checkSystemHealth();
        res.status(200).json(healthStatus);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve system health status' });
    }
});

// GET /health/services - Individual service health checks
router.get('/services', async (req, res) => {
    try {
        const serviceHealth = await healthMonitor.checkServiceHealth();
        res.status(200).json(serviceHealth);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve service health status' });
    }
});

// GET /health - Health check endpoint
router.get('/', (req, res) => {
    res.status(200).json({ status: 'Healthy' });
});

module.exports = router;