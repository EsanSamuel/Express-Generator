# Express Generator

CLI tool that scaffolds a TypeScript-ready Express project with a sensible folder structure, starter configuration files, and example route/controller code.

## Features
- Interactive prompt to name your new project directory.
- Generates `src` with common subfolders (`controllers`, `routes`, `middleware`, `config`, `utils`, `libs`, `services`).
- Creates starter Express server, `.env`, controller, and route templates.
- Produces baseline configs: `package.json`, `tsconfig.json`, and `nodemon.json`.
- Uses modern tooling (`typescript`, `ts-node`, `nodemon`) out of the box.

## Quick Start
```bash
# install dependencies
npm install

# run the generator (from repo root)
npx ts-node src/index.ts
```

Follow the prompt to name your app. A folder matching the name you provide will be created in the current working directory with the generated project files.

## Generated Project Structure
```text
<your-app-name>/
├─ package.json
├─ tsconfig.json
├─ nodemon.json
└─ src/
   ├─ index.ts
   ├─ .env
   ├─ controllers/
   │  └─ user.controller.ts
   ├─ routes/
   │  └─ user.route.ts
   ├─ middleware/
   ├─ config/
   ├─ utils/
   ├─ libs/
   └─ services/
```

## Working With the Generated App
Inside the newly generated project folder:
```bash
npm install
npm run start
```

The default server listens on port `5000` and responds to `GET /` with a status message. Update `src/index.ts` to customize the server and routes. Environment variables can be added to the generated `.env` file.

## Development Notes
- The generator uses `figlet` and `chalk` to display banner output in the terminal.
- File creation logic lives in `src/helpers/generators`. Adjust the templates there to customize generated files.
- `nodemon` watches the `src` directory and runs `ts-node src/index.ts` in the generated app for rapid iteration.

## Roadmap Ideas
- Support for additional resource templates (e.g., services, repositories).
- Optional database setup (Prisma, Sequelize, etc.).
- Command-line flags to skip prompts or choose templates.

## License
MIT © 2025

