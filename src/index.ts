#!/usr/bin/env node
import path from "path";
import fs from "fs";
import { files } from "./helpers/generators/config-files";
import { srcFiles } from "./helpers/generators/src-files";
import {
  userControllerFile,
  userRouteFiles,
} from "./helpers/generators/controller-files";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { exec } from "child_process";

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
    console.log(chalk.blue(data));
    main();
  }
);

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What do you want to call your app?",
    },
  ]);

  //const projectName = process.argv[2];

  if (!answers.name) {
    console.log("There is no folder name!");
    process.exit(1);
  }

  const projectPath = path.join(process.cwd(), answers.name);

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
    console.log(chalk.blue(`📁 Created project: ${answers.name}`));
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

  exec("npm install", { cwd: projectPath }, (error, stdout, stderr) => {
    if (error) {
      console.error("Error executing npm install", error);
      return;
    }
    console.log(`✅ Installation successful: ${stdout}`);
    if (stderr) {
      console.error(`❌ Installation Error: ${stderr}`);
    }
    if (stdout) {
      console.log("✅ Project setup completed!");
    }
  });
}
