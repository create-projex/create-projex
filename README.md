# 🚀 create-projex

> **A blazing-fast CLI tool to scaffold modern web projects with guided setup and AI assistance.**

[![npm version](https://img.shields.io/npm/v/create-projex.svg)](https://www.npmjs.com/package/create-projex)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.17.0-green.svg)](https://nodejs.org/)

## ✨ Features

- ⚡ **Lightning Fast** - Local templates for instant scaffolding  
- 🧠 **Smart Prompts** - Guided setup with intelligent defaults
- 🎨 **Variable Templating** - Dynamic file and content generation
- 🚀 **Deploy Ready** - Vercel, Netlify, Cloudflare Pages support
- 🤖 **AI Integration** - Built-in Gemini CLI support

## 🎯 Quick Start

```bash
# Create a new project (interactive mode)
npm create projex@latest

# Non-interactive mode
npm create projex@latest -- \
  --template portfolio-react \
  --name my-portfolio \
  --fullName "John Doe" \
  --deploy vercel \
  --yes
```

## 📚 Available Templates

### 🎨 **portfolio-react**
*Professional portfolio website*
- ⚛️ React 18 + TypeScript + Vite
- 🎨 Tailwind CSS with responsive design
- 🌙 Dark/Light mode toggle
- 📝 Optional blog section
- 🎬 Scroll animations
- 📊 Google Analytics integration

### 🚀 **landing-page**  
*Modern product landing page*
- ⚛️ React 18 + TypeScript + Vite
- 🎨 Customizable brand colors
- 📧 Newsletter signup integration
- 🎬 Smooth scroll animations
- 📱 Fully responsive design

### 📝 **personal-blog**
*Content-focused blog with MDX*
- 🚀 Astro + MDX for optimal performance  
- 🏷️ Tag system and pagination
- 🌙 Dark mode support
- 💬 Comments system (Giscus/Disqus)
- 📡 RSS feed generation
- 🎯 SEO optimized

## 📖 CLI Reference

```bash
# Create new project (interactive)
create-projex

# List available templates
create-projex templates list

# System health check
create-projex doctor
```

### Command Line Options

| Option | Description |
|--------|-------------|
| `--template <id>` | Template to use |
| `--name <name>` | Project name |
| `--yes` | Use defaults for all prompts |
| `--non-interactive` | Fail if input missing |
| `--deploy <target>` | Deployment target (vercel, netlify, cloudflare, none) |

### Template Variables

Each template supports specific configuration options that can be passed via CLI or answered interactively.

## 💡 Usage Examples

```bash
# Portfolio website
npm create projex@latest -- \
  --template portfolio-react \
  --name my-portfolio \
  --fullName "John Doe" \
  --title "Developer" \
  --deploy vercel --yes

# Landing page
npm create projex@latest -- \
  --template landing-page \
  --name awesome-product \
  --companyName "Startup Inc" \
  --deploy netlify --yes

# Personal blog
npm create projex@latest -- \
  --template personal-blog \
  --name my-blog \
  --authorName "Jane Doe" \
  --deploy cloudflare --yes
```

## 🤖 AI Integration

Built-in support for [Gemini CLI](https://github.com/google-gemini/gemini-cli):

```bash
npx https://github.com/google-gemini/gemini-cli
```

Perfect for generating custom components, sample data, and project customization.

## 🔧 Development

```bash
# Install dependencies
npm install

# Development mode (watch + rebuild)
npm run dev

# Build for production
npm run build

# Test locally
node dist/index.js --list
```

## 📋 Requirements

- **Node.js** ≥18.17.0
- **npm** ≥8.0.0
- **Git** (optional)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Dhruv Chheda](https://github.com/chhedadhruv)

---

<div align="center">

**Built with ❤️ for the developer community**

[🐛 Report Bug](https://github.com/chhedadhruv/create-projex/issues) • [✨ Request Feature](https://github.com/chhedadhruv/create-projex/issues) • [💬 Discussions](https://github.com/chhedadhruv/create-projex/discussions)

</div>