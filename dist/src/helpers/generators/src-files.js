"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.srcFiles = void 0;
exports.srcFiles = {
    "index.ts": `
import express from "express";
import dotenv from "dotenv";
import http from "http";

const PORT = 5000;
const app = express();
const server = http.createServer(app);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Express app is running");
});

const startServer = () => {
  server.listen(PORT, () => console.log("Server is running at PORT 5000"));
};
startServer();

    `,
    ".env": "DATABASE_URL=...",
};
