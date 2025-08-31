// This file provides helper functions for handling time-series data, including functions for formatting and querying time-series metrics.

const moment = require('moment');

/**
 * Formats a timestamp into a human-readable format.
 * @param {Date} timestamp - The timestamp to format.
 * @returns {string} - The formatted timestamp.
 */
function formatTimestamp(timestamp) {
    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Generates a time-series data structure for metrics.
 * @param {Array} data - The raw metrics data.
 * @param {string} metricName - The name of the metric.
 * @returns {Array} - The formatted time-series data.
 */
function generateTimeSeries(data, metricName) {
    return data.map(entry => ({
        time: formatTimestamp(entry.timestamp),
        value: entry.value,
        metric: metricName
    }));
}

/**
 * Filters time-series data based on a time range.
 * @param {Array} data - The time-series data to filter.
 * @param {Date} startTime - The start time of the range.
 * @param {Date} endTime - The end time of the range.
 * @returns {Array} - The filtered time-series data.
 */
function filterTimeSeriesByRange(data, startTime, endTime) {
    return data.filter(entry => {
        const entryTime = new Date(entry.time);
        return entryTime >= startTime && entryTime <= endTime;
    });
}

module.exports = {
    formatTimestamp,
    generateTimeSeries,
    filterTimeSeriesByRange
};