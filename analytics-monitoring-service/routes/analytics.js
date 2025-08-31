const express = require('express');
const router = express.Router();
const reportGenerator = require('../services/reportGenerator');

// GET /analytics/dashboard - Get dashboard data
router.get('/dashboard', async (req, res) => {
    try {
        const dashboardData = await reportGenerator.getDashboardData();
        res.status(200).json(dashboardData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving dashboard data', error: error.message });
    }
});

// GET /analytics/reports - Generate analytics reports
router.get('/reports', async (req, res) => {
    try {
        const reports = await reportGenerator.generateReports();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error generating reports', error: error.message });
    }
});

module.exports = router;