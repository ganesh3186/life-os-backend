"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInsightsController = void 0;
const insight_service_1 = require("../services/insight.service");
const getInsightsController = async (req, res) => {
    try {
        const type = req.query.type || "monthly";
        const data = await (0, insight_service_1.getInsights)(req.userId, type);
        res.json({
            success: true,
            data,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.getInsightsController = getInsightsController;
