const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'resolved', 'dismissed'],
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

alertSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;