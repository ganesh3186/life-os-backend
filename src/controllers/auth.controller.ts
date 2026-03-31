import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await loginUser(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json({
      success: true,
      accessToken,
      user,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "No refresh token" });
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET as string
  ) as { userId: string };

  const user = await User.findById(decoded.userId);

  if (!user || user.refreshToken !== token) {
    return res.status(403).json({ success: false, message: "Invalid refresh token" });
  }

  const newAccessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );

  res.json({
    success: true,
    accessToken: newAccessToken
  });
});
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    ) as { userId: string };

    await User.findByIdAndUpdate(decoded.userId, {
      refreshToken: ""
    });
  }

  res.clearCookie("refreshToken");

  res.json({
    success: true,
    message: "Logged out successfully"
  });
});