const Joi = require('joi');

const metricSchema = Joi.object({
    name: Joi.string().required(),
    value: Joi.number().required(),
    timestamp: Joi.date().default(Date.now),
});

const eventSchema = Joi.object({
    eventType: Joi.string().required(),
    userId: Joi.string().required(),
    timestamp: Joi.date().default(Date.now),
    details: Joi.object().optional(),
});

const alertSchema = Joi.object({
    service: Joi.string().required(),
    threshold: Joi.number().required(),
    alertType: Joi.string().valid('warning', 'critical').required(),
    message: Joi.string().optional(),
});

const validateMetric = (req, res, next) => {
    const { error } = metricSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateEvent = (req, res, next) => {
    const { error } = eventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateAlert = (req, res, next) => {
    const { error } = alertSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateMetric,
    validateEvent,
    validateAlert,
};