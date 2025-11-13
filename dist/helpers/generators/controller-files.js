"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouteFiles = exports.userControllerFile = void 0;
exports.userControllerFile = `
// src/helpers/userHelper.ts

import { Request, Response } from "express";

export default class UserHelper {
  /**
   * 🧩 Example helper for fetching a user or performing user logic
   */
  static async user(req: Request, res: Response) {
    try {
      // Example: extract userId from request (query, params, or body)
      const { userId } = req.params;

      // Simulate DB fetch (replace with real DB call)
      const user = {
        id: userId,
        name: "John Doe",
        email: "johndoe@example.com",
      };

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "User fetched successfully",
        user,
      });
    } catch (error: any) {
      console.error("Error in UserHelper.user:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
`;
exports.userRouteFiles = `
import { Router } from "express";
import UserController from "../controllers/userController";

const userRouter = Router();

/**
 * @route GET /api/users/:userId
 * @desc Get a user by ID
 */
userRouter.get("/:userId", UserController.getUser);

export default router;
`;
