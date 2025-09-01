# 🚀 create-projex

> **A blazing-fast, intelligent CLI tool to scaffold modern TypeScript projects with guided setup and AI assistance.**

[![npm version](https://img.shields.io/npm/v/create-projex.svg)](https://www.npmjs.com/package/create-projex)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.17.0-green.svg)](https://nodejs.org/)

---

## ✨ **Why create-projex?**

**create-projex** goes beyond simple project scaffolding. It provides an **intelligent, guided experience** that takes you from project creation to deployment, with **AI assistance** and **automated workflows** built right in.

---

## 🎯 **Quick Start**

```bash
# 🚀 Create a new project (interactive mode)
npm create projex@latest

# ⚡ Or with npx
npx create-projex@latest

# 🤖 Non-interactive mode (perfect for CI/CD)
npm create projex@latest -- \
  --template portfolio-react \
  --name my-awesome-portfolio \
  --router yes \
  --tailwind yes \
  --testing no \
  --deploy vercel \
  --yes --non-interactive
```

---

## 🎪 **What Makes It Special**

### 🔥 **Core Features**
- ⚡ **Lightning Fast** - Minimal dependencies, optimized for speed
- 🎨 **Local Templates** - Templates stored locally for instant access
- 🧠 **Smart Prompts** - Guided setup with intelligent defaults
- 🤖 **AI Integration** - Built-in Gemini CLI support for project customization
- 🚀 **Full Workflow** - From creation to deployment in one flow

### 🛠️ **Developer Experience**
- 📝 **Variable Templating** - `{{variable}}` substitution in files and paths
- 🎯 **Conditional Blocks** - Include/exclude code based on choices
- 💻 **Editor Integration** - Auto-open in VS Code or preferred editor
- 🌐 **Dev Server** - Automatic dependency installation and server startup
- 🔒 **Safe Hooks** - Secure post-creation automation

### 🚀 **Deployment Ready**
- 🌍 **Multi-Platform** - Vercel, Netlify, Cloudflare Pages support
- 📦 **CI/CD Friendly** - Complete non-interactive mode
- 🔧 **Production Optimized** - Best practices built-in

---

## 📚 **Available Templates**

### 🎨 **portfolio-react**
*Perfect for showcasing your work and skills*

**✨ Features:**
- ⚛️ React 18 + TypeScript
- 🎨 Tailwind CSS with custom design system
- 🌙 Dark/Light mode toggle
- 📱 Fully responsive design
- 🎯 SEO optimized
- 📝 Blog-ready structure
- 🎬 Smooth scroll animations
- 📊 Google Analytics integration

### 🔧 **react-vite-starter**
*Modern React starter for any project*

**✨ Features:**
- ⚛️ React 18 + TypeScript
- ⚡ Vite for blazing fast development
- 🎨 Optional Tailwind CSS
- 🧭 Optional React Router
- 🧪 Optional Vitest testing setup
- 📦 ESLint + Prettier configured
- 🚀 Deploy-ready configuration

---

## 🎮 **Interactive Experience**

When you run `create-projex`, you'll get a **complete guided experience**:

### 1️⃣ **Project Setup**
- 🎯 Template selection with previews
- 📝 Project configuration (name, features, etc.)
- ✅ Intelligent validation and suggestions

### 2️⃣ **Development Environment**
```bash
💻 Code Editor Options:
✔ Open in VS Code automatically
✔ Switch to project directory  
✔ Manual setup instructions
```

### 3️⃣ **AI-Powered Customization**
```bash
🤖 AI Assistant Option:
✔ Gemini CLI integration
✔ One-click AI assistance setup
✔ Smart project customization help
```

### 4️⃣ **Development Server**
```bash
🌐 Development Server:
✔ Automatic dependency installation
✔ Launch dev server instantly
✔ Live development ready
```

### 5️⃣ **Deployment Setup**
```bash
🚀 Deployment Options:
✔ Vercel - Instant deployment
✔ Netlify - JAMstack optimized  
✔ Cloudflare Pages - Edge computing
✔ Custom deployment guidance
```

---

## 📖 **CLI Reference**

### **Basic Commands**

```bash
# 🎯 Create new project (interactive)
create-projex

# 🎨 Create with specific template
create-projex --template portfolio-react

# 📋 List available templates
create-projex --list
create-projex templates list

# 🔍 Get template details
create-projex --info portfolio-react
create-projex templates info portfolio-react

# 🏥 System health check
create-projex doctor
```

### **Command Line Options**

| Option | Description | Default |
|--------|-------------|---------|
| `--template <id>` | Template to use | *prompt* |
| `--name <name>` | Project name | *prompt* |
| `--dir <path>` | Output directory | `./<projectName>` |
| `--yes` | Use defaults for all prompts | `false` |
| `--non-interactive` | Fail if input missing | `false` |
| `--open-vscode` | Auto-open in VS Code | `false` |
| `--debug` | Enable debug logging | `false` |

### **Template-Specific Options**

| Option | Description | Templates |
|--------|-------------|-----------|
| `--router <yes\|no>` | Include React Router | `react-vite-starter` |
| `--tailwind <yes\|no>` | Include Tailwind CSS | `react-vite-starter` |
| `--testing <yes\|no>` | Include testing setup | `react-vite-starter` |
| `--deploy <target>` | Deployment target | *all templates* |
| `--fullName <name>` | Your full name | `portfolio-react` |
| `--title <title>` | Professional title | `portfolio-react` |
| `--email <email>` | Email address | `portfolio-react` |
| `--github <username>` | GitHub username | `portfolio-react` |
| `--linkedin <username>` | LinkedIn username | `portfolio-react` |
| `--darkMode <yes\|no>` | Dark mode toggle | `portfolio-react` |
| `--blog <yes\|no>` | Include blog section | `portfolio-react` |
| `--animations <yes\|no>` | Scroll animations | `portfolio-react` |
| `--analytics <yes\|no>` | Google Analytics | `portfolio-react` |

### **Deployment Targets**

| Target | Platform | Best For |
|--------|----------|----------|
| `none` | No deployment | Local development |
| `vercel` | [Vercel](https://vercel.com) | React apps, Next.js |
| `netlify` | [Netlify](https://netlify.com) | JAMstack, static sites |
| `cloudflare` | [Cloudflare Pages](https://pages.cloudflare.com) | Edge computing, global CDN |

---

## 💡 **Usage Examples**

### 🎨 **Create a Portfolio Website**
```bash
# Interactive mode (recommended for first-time users)
npm create projex@latest

# Quick portfolio setup
npx create-projex@latest -- \
  --template portfolio-react \
  --name john-portfolio \
  --fullName "John Doe" \
  --title "Full Stack Developer" \
  --email "john@example.com" \
  --github "johndoe" \
  --linkedin "johndoe" \
  --darkMode yes \
  --blog yes \
  --animations yes \
  --deploy vercel \
  --yes
```

### 🔧 **Create a React Starter Project**
```bash
# Full-featured React app
npx create-projex@latest -- \
  --template react-vite-starter \
  --name awesome-app \
  --router yes \
  --tailwind yes \
  --testing yes \
  --deploy vercel \
  --open-vscode \
  --yes
```

### 🚀 **CI/CD Ready Setup**
```bash
# Non-interactive mode for automation
npx create-projex@latest -- \
  --template react-vite-starter \
  --name production-app \
  --router yes \
  --tailwind yes \
  --testing yes \
  --deploy netlify \
  --yes \
  --non-interactive
```

### 🎯 **Minimal Setup**
```bash
# Simple, no-frills React app
npx create-projex@latest -- \
  --template react-vite-starter \
  --name simple-app \
  --router no \
  --tailwind no \
  --testing no \
  --deploy none \
  --yes
```

---

## 🤖 **AI-Powered Development**

### **Gemini CLI Integration**

create-projex includes built-in support for [Gemini CLI](https://github.com/google-gemini/gemini-cli) to help you customize your project with AI assistance:

```bash
# Quick run (no installation required)
npx https://github.com/google-gemini/gemini-cli

# Or install globally
npm install -g @google/gemini-cli
```

**💡 Use Cases:**
- Generate custom components
- Create sample data and content
- Optimize code structure
- Add new features with AI guidance
- Debug and refactor existing code

---

## 🛠️ **Template Development**

### **Template Structure**
```
templates/my-template/
├── template/          # Files to copy and process
│   ├── src/
│   ├── package.json
│   └── ...
├── myproj.json       # Template configuration
└── hooks.yaml        # Post-creation hooks
```

### **Variable Templating**

Use `{{variableName}}` in any text file or file path:

```typescript
// In template files
export const projectName = "{{projectName}}";
export const author = "{{fullName}}";

// File paths support variables too
// templates/{{projectName}}-config.ts
```

### **Conditional Blocks**

Include/exclude code based on user choices:

```typescript
// Single-line conditionals
// #if router
import { BrowserRouter } from 'react-router-dom';
// #endif

/* Multi-line block conditionals */
/* #if tailwind */
import './styles.css';
import { cn } from './utils';
/* #endif */

// Negation support
// #if !router
// Code when router is NOT selected
// #endif
```

**Supported Conditions:**
- `router` - React Router inclusion
- `tailwind` - Tailwind CSS inclusion  
- `testing` - Testing setup inclusion
- `darkMode` - Dark mode support
- `blog` - Blog functionality
- `animations` - Scroll animations
- `analytics` - Analytics integration

### **JSON Conditional Templating**

For `package.json` and other JSON files, use handlebars-style conditionals:

```json
{
  "dependencies": {
    "react": "^18.0.0"
    {{#if router}},
    "react-router-dom": "^6.0.0"
    {{/if}}
    {{#if tailwind}},
    "tailwindcss": "^3.0.0"
    {{/if}}
  }
}
```

---

## 🔧 **Development**

### **Setup**
```bash
# 📦 Install dependencies
npm install

# 🔥 Development mode (watch + rebuild)
npm run dev

# 🏗️ Build for production
npm run build

# 🧪 Run tests
npm run test

# ✨ Lint and format
npm run lint

# 🔍 Type checking
npm run typecheck
```

### **Testing Your Changes**
```bash
# Build and test locally
npm run build
node dist/index.js --list

# Test with a real project
node dist/index.js test-project --template portfolio-react --yes
```

---

## 📋 **Requirements**

- **Node.js** ≥18.17.0
- **npm** ≥8.0.0 (or yarn/pnpm equivalent)
- **Git** (optional, for post-create hooks)

---

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Quick Contribution Steps**
1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. ✅ Commit your changes (`git commit -m 'Add amazing feature'`)
4. 🚀 Push to the branch (`git push origin feature/amazing-feature`)
5. 🎯 Open a Pull Request

---

## 📄 **License**

MIT © [Dhruv Chheda](https://github.com/chhedadhruv)

---

## 🌟 **Show Your Support**

If create-projex helps you build amazing projects, give us a ⭐ on GitHub!

---

<div align="center">

**Built with ❤️ for the developer community**

[🐛 Report Bug](https://github.com/chhedadhruv/create-projex/issues) • [✨ Request Feature](https://github.com/chhedadhruv/create-projex/issues) • [💬 Discussions](https://github.com/chhedadhruv/create-projex/discussions)

</div>