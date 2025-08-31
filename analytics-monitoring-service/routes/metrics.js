const express = require('express');
const router = express.Router();
const metricsCollector = require('../services/metricsCollector');
const { validateMetric } = require('../middleware/validation');

// POST /metrics - Record custom metrics
router.post('/', validateMetric, async (req, res) => {
    try {
        const metricData = req.body;
        const result = await metricsCollector.recordMetric(metricData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error recording metric', error: error.message });
    }
});

// GET /metrics - Get system metrics
router.get('/', async (req, res) => {
    try {
        const metrics = await metricsCollector.getSystemMetrics();
        res.status(200).json(metrics);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving metrics', error: error.message });
    }
});

// GET /metrics/:service - Get service-specific metrics
router.get('/:service', async (req, res) => {
    try {
        const serviceName = req.params.service;
        const metrics = await metricsCollector.getServiceMetrics(serviceName);
        res.status(200).json(metrics);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving service metrics', error: error.message });
    }
});

module.exports = router;