const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
const register = new client.Registry();

// Collect default metrics
collectDefaultMetrics({ register });

// Custom metrics can be defined here
const customMetric = new client.Gauge({
    name: 'custom_metric',
    help: 'This is a custom metric for demonstration purposes',
    labelNames: ['label1', 'label2'],
});

// Function to get metrics
const getMetrics = async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (error) {
        res.status(500).send('Error retrieving metrics');
    }
};

// Export the Prometheus client and metrics retrieval function
module.exports = {
    register,
    getMetrics,
    customMetric,
};