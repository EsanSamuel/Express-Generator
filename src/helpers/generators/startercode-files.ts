export const userControllerFile = `
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

export const userRouteFiles = `
import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRouter = Router();

/**
 * @route GET /api/users/:userId
 * @desc Get a user by ID
 */
userRouter.get("/:userId", UserController.user);

export default userRouter;
`;

export const redisServiceFile = `
import logger from "../config/logger.config";
import redis from "../config/redis.config";

export default class RedisService {
  async set<T>(key: string, value: T, ttl?: number) {
    const stringValue = typeof value === "string" ? value : JSON.stringify(value);

    if (ttl) {
      await redis.setex(key, ttl, stringValue);
      logger.info(\`\${key} has been stored in Redis with TTL \${ttl}s\`);
    } else {
      await redis.set(key, stringValue);
      logger.info(\`\${key} has been stored in Redis\`);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch {
      return data as unknown as T;
    }
  }

  async del(key: string) {
    if (!key) return;
    await redis.del(key);
    logger.info(\`\${key} has been deleted from Redis\`);
  }

  async exist(key: string): Promise<boolean> {
    const result = await redis.exists(key);
    return result === 1;
  }

  async flushdb() {
    await redis.flushdb();
    logger.info("Redis DB has been cleared!");
  }

  async delByPattern(pattern: string) {
    const stream = redis.scanStream({
      match: pattern,
      count: 100,
    });

    return new Promise<void>((resolve, reject) => {
      stream.on("data", async (keys: string[]) => {
        if (keys.length) {
          await redis.del(...keys);
          logger.info(\`Deleted \${keys.length} cache keys for pattern: \${pattern}\`);
        }
      });

      stream.on("end", () => {
        logger.info(\`Finished deleting all keys for pattern: \${pattern}\`);
        resolve();
      });

      stream.on("error", (err) => {
        logger.error(\`Error while deleting keys for pattern \${pattern}: \${err}\`);
        reject(err);
      });
    });
  }
}

`;

export const loggerConfigFile = `
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
    },
  },
});

export default logger;
`;

export const redisConfigFile = `
import Redis from "ioredis";
import logger from "../config/logger.config";

const redis = new Redis();

redis.on("connect", () => {
  logger.info("✅ Redis connected successfully");
});

redis.on("error", (err) => {
  logger.error({ err }, "❌ Redis connection failed");
});

export default redis;

`;

export const prismaConfigFile = `
import { PrismaClient } from "../generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export default client;

`;
