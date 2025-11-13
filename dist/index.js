#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_files_1 = require("./helpers/generators/config-files");
const src_files_1 = require("./helpers/generators/src-files");
const startercode_files_1 = require("./helpers/generators/startercode-files");
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const figlet_1 = __importDefault(require("figlet"));
const child_process_1 = require("child_process");
const util_1 = require("util");
figlet_1.default.text("Express Generator", {
    font: "Big",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 150,
    whitespaceBreak: true,
}, (err, data) => {
    if (err) {
        console.error("Something went wrong with Figlet...");
        console.error(err);
        return;
    }
    console.log(chalk_1.default.cyanBright(data));
    main();
});
async function main() {
    const answers = await inquirer_1.default.prompt([
        {
            type: "input",
            name: "name",
            message: "What do you want to call your app?",
        },
        {
            type: "confirm",
            name: "prisma",
            message: "Do you want to install Prisma?",
        },
    ]);
    const defaultName = process.argv[2];
    if (!answers.name) {
        console.log("There is no folder name!");
        process.exit(1);
    }
    const projectPath = path_1.default.join(process.cwd(), answers.name);
    const folders = [
        "controllers",
        "routes",
        "middleware",
        "config",
        "utils",
        "libs",
        "services",
    ];
    if (fs_1.default.existsSync(projectPath)) {
        console.log("Project Path already exists!");
        process.exit(1);
    }
    if (!fs_1.default.existsSync(projectPath)) {
        fs_1.default.mkdirSync(projectPath);
        console.log(chalk_1.default.cyanBright(`📁 Created project: ${answers.name}`));
    }
    const srcFolderPath = path_1.default.join(projectPath, "src");
    fs_1.default.mkdirSync(srcFolderPath);
    folders.forEach((folder) => {
        const folderPath = path_1.default.join(srcFolderPath, folder);
        fs_1.default.mkdirSync(folderPath);
        console.log(`📂 ${folder} created!`);
        if (folder === "controllers") {
            const filePath = path_1.default.join(folderPath, "user.controller.ts");
            fs_1.default.writeFileSync(filePath, startercode_files_1.userControllerFile);
        }
        if (folder === "routes") {
            const filePath = path_1.default.join(folderPath, "user.route.ts");
            fs_1.default.writeFileSync(filePath, startercode_files_1.userRouteFiles);
        }
        if (folder === "services") {
            const filePath = path_1.default.join(folderPath, "redis.service.ts");
            fs_1.default.writeFileSync(filePath, startercode_files_1.redisServiceFile);
        }
        if (folder === "config") {
            const filePath = path_1.default.join(folderPath, "redis.config.ts");
            fs_1.default.writeFileSync(filePath, startercode_files_1.redisConfigFile);
            const loggerFilePath = path_1.default.join(folderPath, "logger.config.ts");
            fs_1.default.writeFileSync(loggerFilePath, startercode_files_1.loggerConfigFile);
        }
        if (folder === "config" && answers.prisma) {
            const filePath = path_1.default.join(folderPath, "prismadb.ts");
            fs_1.default.writeFileSync(filePath, startercode_files_1.prismaConfigFile);
        }
    });
    for (const [configFilename, command] of Object.entries(config_files_1.files)) {
        const filePath = path_1.default.join(projectPath, configFilename);
        fs_1.default.writeFileSync(filePath, command.trim());
        console.log(`📄 File created: ${configFilename}`);
    }
    for (const [filename, content] of Object.entries(src_files_1.srcFiles)) {
        const filePath = path_1.default.join(srcFolderPath, filename);
        fs_1.default.writeFileSync(filePath, content.trim());
        console.log(`📄 File created: ${filename}`);
    }
    const execInstall = (0, util_1.promisify)(child_process_1.exec);
    console.log(chalk_1.default.cyanBright("⌛ Installing packages. Running npm install..."));
    const { stdout, stderr } = await execInstall("npm install", {
        cwd: projectPath,
    });
    console.log(`✅ Installation successful: ${stdout}`);
    if (stderr) {
        console.error(`❌ Installation Error: ${stderr}`);
    }
    if (answers.prisma) {
        console.log(chalk_1.default.cyanBright("⌛ Installing prisma..."));
        const { stdout, stderr } = await execInstall("npm install prisma", {
            cwd: projectPath,
        });
        console.log(`✅ Prisma installed successful: ${stdout}`);
        if (stderr) {
            console.error(`❌ Prisma Installation Failed: ${stderr}`);
        }
        if (stdout) {
            console.log("✅ Prisma installed!\n");
        }
        const { stdout: initout, stderr: initerr } = await execInstall("npx prisma init", {
            cwd: projectPath,
        });
        if (initerr) {
            console.error(`❌ Prisma Initialization Failed: ${stderr}`);
        }
    }
    if (stdout) {
        console.log("✅ Project setup completed!");
    }
}
