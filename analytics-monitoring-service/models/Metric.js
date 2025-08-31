const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    service: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
});

const Metric = mongoose.model('Metric', metricSchema);

module.exports = Metric;