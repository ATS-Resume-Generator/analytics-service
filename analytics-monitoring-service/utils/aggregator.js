const _ = require('lodash');

/**
 * Aggregates metrics data based on the provided criteria.
 * 
 * @param {Array} metrics - Array of metric objects to aggregate.
 * @param {String} aggregationType - Type of aggregation (e.g., 'sum', 'average').
 * @returns {Object} - Aggregated metrics result.
 */
function aggregateMetrics(metrics, aggregationType) {
    if (!Array.isArray(metrics) || metrics.length === 0) {
        return {};
    }

    const aggregatedResult = {};

    metrics.forEach(metric => {
        const { service, value } = metric;

        if (!aggregatedResult[service]) {
            aggregatedResult[service] = [];
        }
        aggregatedResult[service].push(value);
    });

    for (const service in aggregatedResult) {
        switch (aggregationType) {
            case 'sum':
                aggregatedResult[service] = _.sum(aggregatedResult[service]);
                break;
            case 'average':
                aggregatedResult[service] = _.mean(aggregatedResult[service]);
                break;
            // Add more aggregation types as needed
            default:
                break;
        }
    }

    return aggregatedResult;
}

/**
 * Prepares data for visualization based on aggregated metrics.
 * 
 * @param {Object} aggregatedData - The aggregated metrics data.
 * @returns {Array} - Formatted data for visualization.
 */
function prepareVisualizationData(aggregatedData) {
    const visualizationData = [];

    for (const service in aggregatedData) {
        visualizationData.push({
            service,
            value: aggregatedData[service],
        });
    }

    return visualizationData;
}

module.exports = {
    aggregateMetrics,
    prepareVisualizationData,
};