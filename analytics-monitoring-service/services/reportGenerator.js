const mongoose = require('mongoose');
const Metric = require('../models/Metric');
const Event = require('../models/Event');
const Alert = require('../models/Alert');
const moment = require('moment');

const generateReport = async (startDate, endDate) => {
    try {
        const metrics = await Metric.find({
            createdAt: {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            }
        });

        const events = await Event.find({
            createdAt: {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            }
        });

        const alerts = await Alert.find({
            createdAt: {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            }
        });

        return {
            metrics,
            events,
            alerts,
            reportGeneratedAt: new Date()
        };
    } catch (error) {
        throw new Error('Error generating report: ' + error.message);
    }
};

const getReportSummary = (reportData) => {
    return {
        totalMetrics: reportData.metrics.length,
        totalEvents: reportData.events.length,
        totalAlerts: reportData.alerts.length,
        reportGeneratedAt: reportData.reportGeneratedAt
    };
};

module.exports = {
    generateReport,
    getReportSummary
};