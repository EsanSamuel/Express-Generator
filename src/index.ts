#!/usr/bin/env node
import path from "path";
import fs from "fs";
import { files } from "./helpers/generators/config-files";
import { srcFiles } from "./helpers/generators/src-files";
import {
  loggerConfigFile,
  prismaConfigFile,
  redisConfigFile,
  redisServiceFile,
  userControllerFile,
  userRouteFiles,
} from "./helpers/generators/startercode-files";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { exec } from "child_process";
import { promisify } from "util";

figlet.text(
  "Express Generator",
  {
    font: "Big",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 150,
    whitespaceBreak: true,
  },
  (err, data) => {
    if (err) {
      console.error("Something went wrong with Figlet...");
      console.error(err);
      return;
    }
    console.log(chalk.cyanBright(data));
    main();
  }
);

async function main() {
  const defaultName = process.argv[2];

  const answers = await inquirer.prompt([
    ...(!defaultName
      ? [
          {
            type: "input",
            name: "name",
            message: "What do you want to call your app?",
          },
        ]
      : []),
    {
      type: "confirm",
      name: "prisma",
      message: "Do you want to install Prisma?",
    },
  ]);

  if (!answers.name && !defaultName) {
    console.log("There is no folder name!");
    process.exit(1);
  }

  const projectPath = path.join(process.cwd(), defaultName || answers.name);

  const folders = [
    "controllers",
    "routes",
    "middleware",
    "config",
    "utils",
    "libs",
    "services",
  ];

  if (fs.existsSync(projectPath)) {
    console.log("Project Path already exists!");
    process.exit(1);
  }

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    console.log(
      chalk.cyanBright(`📁 Created project: ${defaultName || answers.name}`)
    );
  }

  const srcFolderPath = path.join(projectPath, "src");
  fs.mkdirSync(srcFolderPath);

  folders.forEach((folder) => {
    const folderPath = path.join(srcFolderPath, folder);
    fs.mkdirSync(folderPath);
    console.log(`📂 ${folder} created!`);

    if (folder === "controllers") {
      const filePath = path.join(folderPath, "user.controller.ts");
      fs.writeFileSync(filePath, userControllerFile);
    }

    if (folder === "routes") {
      const filePath = path.join(folderPath, "user.route.ts");
      fs.writeFileSync(filePath, userRouteFiles);
    }

    if (folder === "services") {
      const filePath = path.join(folderPath, "redis.service.ts");
      fs.writeFileSync(filePath, redisServiceFile);
    }

    if (folder === "config") {
      const filePath = path.join(folderPath, "redis.config.ts");
      fs.writeFileSync(filePath, redisConfigFile);

      const loggerFilePath = path.join(folderPath, "logger.config.ts");
      fs.writeFileSync(loggerFilePath, loggerConfigFile);
    }

    if (folder === "config" && answers.prisma) {
      const filePath = path.join(folderPath, "prismadb.ts");
      fs.writeFileSync(filePath, prismaConfigFile);
    }
  });

  for (const [configFilename, command] of Object.entries(files)) {
    const filePath = path.join(projectPath, configFilename);
    fs.writeFileSync(filePath, command.trim());
    console.log(`📄 File created: ${configFilename}`);
  }

  for (const [filename, content] of Object.entries(srcFiles)) {
    const filePath = path.join(srcFolderPath, filename);
    fs.writeFileSync(filePath, content.trim());
    console.log(`📄 File created: ${filename}`);
  }

  const execInstall = promisify(exec);

  console.log(
    chalk.cyanBright("⌛ Installing packages. Running npm install...")
  );
  const { stdout, stderr } = await execInstall("npm install", {
    cwd: projectPath,
  });

  console.log(`✅ Installation successful: ${stdout}`);
  if (stderr) {
    console.error(`❌ Installation Error: ${stderr}`);
  }
  if (answers.prisma) {
    console.log(chalk.cyanBright("⌛ Installing prisma..."));
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

    const { stdout: initout, stderr: initerr } = await execInstall(
      "npx prisma init",
      {
        cwd: projectPath,
      }
    );

    if (initerr) {
      console.error(`❌ Prisma Initialization Failed: ${stderr}`);
    }
  }

  if (stdout) {
    console.log("✅ Project setup completed!");
  }
}
