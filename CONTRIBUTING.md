# Contributing to create-projex

We're thrilled that you're interested in contributing to create-projex! This document provides guidelines and information to help you get started.

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥18.17.0
- **npm** ≥8.0.0
- **Git**

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/create-projex.git
   cd create-projex
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Development Mode**
   ```bash
   npm run dev
   ```

4. **Build and Test**
   ```bash
   npm run build
   node dist/index.js --list
   
   # Test with a real project
   node dist/index.js test-project --template portfolio-react --yes
   ```

## 📁 Project Structure

```
src/
├── commands/           # CLI commands (init, templates, doctor)
├── core/              # Core functionality
│   ├── conditionals.ts    # Template conditional processing
│   ├── fs.ts             # File system operations
│   ├── hooks.ts          # Post-creation hooks
│   ├── log.ts            # Logging utilities
│   ├── templates.ts      # Template processing
│   └── variables.ts      # Variable substitution
├── index.ts           # CLI entry point
└── types.ts           # TypeScript types

templates/
├── portfolio-react/   # Portfolio website template
├── landing-page/      # Landing page template
└── personal-blog/     # Blog template
```

## 🛠️ Types of Contributions

### 🐛 Bug Fixes

1. Create an issue describing the bug
2. Fork and create a branch: `git checkout -b fix/bug-description`
3. Make your changes with tests
4. Submit a pull request

### ✨ New Features

1. Create an issue to discuss the feature
2. Wait for maintainer approval
3. Fork and create a branch: `git checkout -b feature/feature-name`
4. Implement with tests and documentation
5. Submit a pull request

### 🎨 New Templates

Templates are the heart of create-projex! We welcome new, high-quality templates.

#### Template Requirements

- **Modern stack** - Use current best practices
- **Well-documented** - Clear README and code comments
- **Production-ready** - Optimized build process
- **Responsive design** - Works on all devices
- **Accessible** - Follows WCAG guidelines
- **TypeScript** - Prefer TypeScript over JavaScript

#### Creating a Template

1. **Create Template Directory**
   ```
   templates/your-template/
   ├── template/          # Files to copy
   ├── myproj.json       # Configuration
   └── hooks.yaml        # Post-creation hooks
   ```

2. **Configure `myproj.json`**
   ```json
   {
     "id": "your-template",
     "displayName": "Your Template Name",
     "version": "1.0.0",
     "vars": [
       {
         "name": "projectName",
         "prompt": "Project name",
         "default": "my-project",
         "pattern": "^[a-z0-9-]+$"
       }
     ],
     "postCreate": {
       "safe": [
         "npm ci || npm install",
         "git init",
         "git add .",
         "git commit -m \"feat: initial setup\""
       ],
       "packageManager": "npm"
     },
     "requires": {
       "node": ">=18.17.0"
     }
   }
   ```

3. **Use Template Variables**
   ```typescript
   // In any file
   export const projectName = "{{projectName}}";
   
   // File paths work too
   // src/{{projectName}}.config.ts
   ```

4. **Add Conditionals**
   ```typescript
   // Single line
   // #if feature
   import { FeatureComponent } from './feature';
   // #endif
   
   // Multi-line
   /* #if feature */
   const config = {
     feature: true
   };
   /* #endif */
   ```

5. **Test Your Template**
   ```bash
   npm run build
   node dist/index.js test-project --template your-template --yes
   cd test-project
   npm start
   ```

### 📖 Documentation

- Fix typos and improve clarity
- Add examples and use cases
- Update outdated information
- Improve code comments

## 📋 Pull Request Process

1. **Before Starting**
   - Check if an issue exists
   - Comment on the issue if you plan to work on it

2. **Branch Naming**
   - `fix/description` for bug fixes
   - `feature/description` for new features
   - `docs/description` for documentation
   - `template/name` for new templates

3. **Commit Messages**
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add portfolio template with dark mode
   fix: resolve variable substitution in file paths
   docs: update template creation guide
   ```

4. **Pull Request**
   - Provide clear description
   - Reference related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
# Test all templates
npm run build

# Test specific template
node dist/index.js test-portfolio --template portfolio-react --yes
node dist/index.js test-landing --template landing-page --yes
node dist/index.js test-blog --template personal-blog --yes
```

### Manual Testing
1. Test interactive mode
2. Test non-interactive mode
3. Test all CLI flags
4. Test in different directories
5. Test deployment configurations

## 🎯 Code Style

- **TypeScript** - Strict mode enabled
- **ESLint** - Follow existing configuration
- **Prettier** - Auto-formatting enabled
- **File naming** - kebab-case for files, PascalCase for components

### Commands
```bash
# Lint
npm run lint

# Format
npm run lint -- --fix

# Type check
npm run typecheck
```

## 🔍 Debugging

Enable debug mode for detailed logging:
```bash
node dist/index.js --debug --template portfolio-react test-debug
```

## 📝 Template Variable Types

### Basic Variables
```json
{
  "name": "projectName",
  "prompt": "Project name",
  "default": "my-project"
}
```

### Choice Variables
```json
{
  "name": "framework",
  "type": "choice",
  "prompt": "Choose framework",
  "choices": ["react", "vue", "svelte"],
  "default": "react"
}
```

### Conditional Variables
```json
{
  "name": "apiKey",
  "prompt": "API Key",
  "when": "feature == yes"
}
```

## 🚨 Security

- Never include sensitive information in templates
- All hooks run in a sandboxed environment
- Only safe npm commands allowed in `postCreate.safe`

## 📞 Getting Help

- 📋 [Create an Issue](https://github.com/chhedadhruv/create-projex/issues)
- 💬 [Start a Discussion](https://github.com/chhedadhruv/create-projex/discussions)
- 📧 Email: me@dhruvchheda.com

## 🏆 Recognition

Contributors will be recognized in:
- Release notes
- README contributors section
- GitHub contributors graph

Thank you for contributing to create-projex! 🎉
