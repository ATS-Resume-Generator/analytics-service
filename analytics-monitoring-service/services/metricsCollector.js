const mongoose = require('mongoose');
const Metric = require('../models/Metric');
const moment = require('moment');

// Function to record custom metrics
async function recordMetric(data) {
    try {
        const metric = new Metric(data);
        await metric.save();
        return metric;
    } catch (error) {
        throw new Error('Error recording metric: ' + error.message);
    }
}

// Function to retrieve system metrics
async function getSystemMetrics() {
    try {
        const metrics = await Metric.find().sort({ createdAt: -1 }).limit(100);
        return metrics;
    } catch (error) {
        throw new Error('Error retrieving system metrics: ' + error.message);
    }
}

// Function to get service-specific metrics
async function getServiceMetrics(serviceName) {
    try {
        const metrics = await Metric.find({ service: serviceName }).sort({ createdAt: -1 }).limit(100);
        return metrics;
    } catch (error) {
        throw new Error('Error retrieving service metrics: ' + error.message);
    }
}

// Function to aggregate metrics over a time period
async function aggregateMetrics(startDate, endDate) {
    try {
        const metrics = await Metric.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: moment(startDate).toDate(),
                        $lte: moment(endDate).toDate()
                    }
                }
            },
            {
                $group: {
                    _id: '$service',
                    averageValue: { $avg: '$value' },
                    totalCount: { $sum: 1 }
                }
            }
        ]);
        return metrics;
    } catch (error) {
        throw new Error('Error aggregating metrics: ' + error.message);
    }
}

module.exports = {
    recordMetric,
    getSystemMetrics,
    getServiceMetrics,
    aggregateMetrics
};