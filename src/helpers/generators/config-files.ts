export const files = {
  "package.json": JSON.stringify(
    {
      name: "express-generator",
      version: "1.0.0",
      description: "",
      license: "ISC",
      author: "",
      main: "index.js",
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
        start: "nodemon",
      },
      dependencies: {
        dotenv: "^17.2.3",
        express: "^5.1.0",
        ioredis: "^5.8.2",
        pino: "^10.1.0",
      },
      devDependencies: {
        "@types/express": "^5.0.5",
        nodemon: "^3.1.11",
        "ts-node": "^10.9.2",
        typescript: "^5.9.3",
      },
    },
    null,
    2
  ),
  "tsconfig.json": JSON.stringify(
    {
      compilerOptions: {
        target: "ESNext",
        module: "CommonJS",
        rootDir: ".",
        outDir: "dist",
        esModuleInterop: true,
        strict: true,
      },
    },
    null,
    2
  ),
  "nodemon.json": JSON.stringify(
    {
      watch: ["src"],
      ext: "ts,js",
      exec: "ts-node ./src/index.ts",
    },
    null,
    2
  ),
};
