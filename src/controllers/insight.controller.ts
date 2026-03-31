import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getInsights } from "../services/insight.service";

export const getInsightsController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const type = (req.query.type as string) || "monthly";
    const data = await getInsights(req.userId!, type);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
