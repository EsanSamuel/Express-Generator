# Express Generator

A powerful CLI tool that scaffolds a TypeScript-ready Express.js project with a well-organized folder structure, starter configuration files, and example route/controller code. Get your Express API up and running in seconds!

## ✨ Features

- 🎯 **Interactive CLI** - Simple prompt-based interface to name your project
- 📁 **Organized Structure** - Pre-configured folder structure following best practices
- ⚡ **TypeScript Ready** - Full TypeScript support with proper configuration
- 🔧 **Modern Tooling** - Includes `ts-node`, `nodemon`, and TypeScript out of the box
- 📝 **Starter Templates** - Example controller and route files to get you started
- ⚙️ **Configuration Files** - Pre-configured `package.json`, `tsconfig.json`, and `nodemon.json`
- 🎨 **Beautiful CLI** - Colorful terminal output with ASCII art banner

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TypeScript (installed as a dependency)

## 🚀 Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

## 💻 Usage

Run the generator from the project root:

```bash
npm start
```

Or directly with ts-node:

```bash
npx ts-node src/index.ts
```

When prompted, enter a name for your Express application. The generator will create a new folder with that name in your current working directory.

**Example:**
```bash
$ npm start
What do you want to call your app? my-awesome-api
📁 Created project: my-awesome-api
📂 controllers created!
📂 routes created!
📂 middleware created!
📂 config created!
📂 utils created!
📂 libs created!
📂 services created!
📄 File created: package.json
📄 File created: tsconfig.json
📄 File created: nodemon.json
📄 File created: index.ts
📄 File created: .env
✅ Project setup completed
Run npm install to continue
```

## 📂 Generated Project Structure

```
<your-app-name>/
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── nodemon.json          # Nodemon configuration for auto-reload
└── src/
    ├── index.ts          # Main Express server file
    ├── .env              # Environment variables template
    ├── controllers/      # Request handlers
    │   └── user.controller.ts
    ├── routes/           # API route definitions
    │   └── user.route.ts
    ├── middleware/       # Custom middleware functions
    ├── config/           # Configuration files
    ├── utils/            # Utility functions
    ├── libs/             # Third-party library wrappers
    └── services/         # Business logic services
```

## 🎯 Working With the Generated App

1. Navigate to your newly generated project:

```bash
cd <your-app-name>
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start
```

The server will start on port `5000` by default. Visit `http://localhost:5000` to see the default response.

### Default Endpoint

- `GET /` - Returns "Express app is running"

## 🛠️ Project Structure (Generator)

```
express-generator/
├── src/
│   ├── index.ts                    # Main CLI entry point
│   └── helpers/
│       └── generators/
│           ├── config-files.ts     # Configuration file templates
│           ├── controller-files.ts # Controller and route templates
│           └── src-files.ts        # Source file templates
├── package.json
├── tsconfig.json
└── nodemon.json
```

## 🔧 Customization

To customize the generated files, edit the templates in `src/helpers/generators/`:

- **`config-files.ts`** - Modify `package.json`, `tsconfig.json`, or `nodemon.json` templates
- **`controller-files.ts`** - Update controller and route file templates
- **`src-files.ts`** - Customize the main `index.ts` and `.env` files

## 📝 Development Notes

- The generator uses `figlet` for ASCII art banners and `chalk` for colored terminal output
- All file templates are defined in the `src/helpers/generators/` directory
- The generated app uses `nodemon` to watch for file changes and auto-reload
- TypeScript files are executed directly using `ts-node` in development

## 🗺️ Roadmap

Future enhancements may include:

- [ ] Support for additional resource templates (services, repositories, models)
- [ ] Optional database setup (Prisma, Sequelize, TypeORM)
- [ ] Command-line flags to skip prompts or choose templates
- [ ] Support for different project structures (MVC, Clean Architecture, etc.)
- [ ] Integration with testing frameworks (Jest, Mocha)
- [ ] Docker configuration generation
- [ ] CI/CD pipeline templates

## 📄 License

MIT © 2025

